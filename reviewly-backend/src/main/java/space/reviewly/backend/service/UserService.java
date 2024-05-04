package space.reviewly.backend.service;

import java.io.IOException;
import java.util.Set;
import org.springframework.web.multipart.MultipartFile;
import space.reviewly.backend.config.ApplicationProperties;
import space.reviewly.backend.exceptions.DataNotValidException;
import space.reviewly.backend.model.EmailConfirmation;
import space.reviewly.backend.model.PasswordRestore;
import space.reviewly.backend.model.user.RegisteredBy;
import space.reviewly.backend.model.user.Role;
import space.reviewly.backend.model.user.User;
import space.reviewly.backend.model.user.User_;
import space.reviewly.backend.repository.UserRepository;
import space.reviewly.backend.service.fileResource.FileResourceType;
import space.reviewly.backend.service.fileResource.S3FileResourceService;
import space.reviewly.backend.utils.TikaWrapper;
import space.reviewly.backend.utils.ValidationUtils;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static java.text.MessageFormat.format;

import java.util.NoSuchElementException;

/**
 * User service.
 *
 * @author Shcherbachenya Igor
 */
@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class UserService {

    public static final String SOCIAL_SIGNUP_USER_PASSWORD_STUB = "PASSWORD_STUB";

    private final UserRepository userRepository;

    private final EmailService emailService;

    private final EmailConfirmationService emailConfirmationService;

    private final PasswordRestoreService passwordRestoreService;

    private final PasswordEncoder passwordEncoder;

    private final S3FileResourceService s3FileResourceService;

    private final ApplicationProperties applicationProperties;

    private final RoleService roleService;

    public User getUser(String userId) {
        return userRepository.findById(userId).orElseThrow(() -> {
            log.error("User with id {} doesn't exist", userId);
            return new NoSuchElementException(format("User with id ''{0}'' doesn't exist", userId));
        });
    }

    @Transactional
    public void registerUser(User newUser) {
        log.info("Register new not confirmed user: {}", newUser.getEmail());

        newUser.setEmailConfirmed(false);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));

        Role defaultRole = roleService.getDefaultRole();

        if (defaultRole != null) {
            newUser.setRoles(Set.of(defaultRole));
        }

        userRepository.save(newUser);
        EmailConfirmation emailConfirmation = emailConfirmationService.createEmailConfirmation(newUser.getId());
        emailService.sendEmailConfirmationMessage(newUser, emailConfirmation);
    }

    @Transactional
    public void confirmEmail(String confirmationId) {
        log.info("Confirm email by confirmation id {}.", confirmationId);
        EmailConfirmation emailConfirmation = emailConfirmationService.getById(confirmationId);
        User user = getUser(emailConfirmation.getUserId());
        user.setEmailConfirmed(true);
        updateUser(user);
        emailConfirmationService.deleteConfirmation(confirmationId);
    }

    @Transactional
    public void resendConfirmationEmailForUser(String userId) {
        User user = getUser(userId);
        Optional<EmailConfirmation> emailConfirmationOptional = emailConfirmationService.findByUserId(userId);
        EmailConfirmation emailConfirmation = emailConfirmationOptional.orElseGet(() -> emailConfirmationService.createEmailConfirmation(userId));

        emailService.sendEmailConfirmationMessage(user, emailConfirmation);
    }

    @Transactional
    public void updateUser(String userId, User userUpdates) {
        User user = getUser(userId);

        validateUpdateUserData(user, userUpdates);

        if (!user.getEmail().equals(userUpdates.getEmail())) {
            user.setEmail(userUpdates.getEmail());
            user.setEmailConfirmed(false);

            EmailConfirmation emailConfirmation = emailConfirmationService
                .findByUserId(userId)
                .orElseGet(() -> emailConfirmationService.createEmailConfirmation(userId));

            emailService.sendChangedEmailConfirmationMessage(user, emailConfirmation);
        }

        if (!user.getFullName().equals(userUpdates.getFullName())) {
            user.setFullName(userUpdates.getFullName());
        }

        updateUser(user);
    }

    @Transactional
    public void updateUser(User user) {
        log.info("Update user: {}", user.getId());
        userRepository.save(user);
    }

    @Transactional
    public void updateUserPassword(String userId, String oldPassword, String newPassword) {
        User user = getUser(userId);

        if (user.getRegisteredBy() == RegisteredBy.NATIVE || !user.getPassword().equals(SOCIAL_SIGNUP_USER_PASSWORD_STUB)) {
            Map<String, List<String>> fieldsErrors = new HashMap<>();

            if (StringUtils.isBlank(oldPassword)) {
                fieldsErrors.put("oldPassword", List.of("Old password must be specified"));
                throw new DataNotValidException("Update user password fail", fieldsErrors);
            }

            if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
                fieldsErrors.put("oldPassword", List.of("Old password is not valid."));
                throw new DataNotValidException("Update user password fail", fieldsErrors);
            }
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        updateUser(user);

        emailService.sendPasswordChangedNotification(user);
    }

    @Transactional
    public void requestPasswordRestoring(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            throw new DataNotValidException(
                "User with this email doesn't exist",
                ValidationUtils.createSingletonFieldErrorMap(User_.EMAIL, "User with this email doesn't exist")
            );
        }

        PasswordRestore passwordRestore = passwordRestoreService.createPasswordRestore(user.get().getId());
        emailService.sendPasswordRestoringLink(user.get(), passwordRestore);
    }

    @Transactional
    public void restorePassword(String passwordRestoreId, String newPassword) {
        PasswordRestore passwordRestore = passwordRestoreService.getById(passwordRestoreId);
        User user = getUser(passwordRestore.getUserId());
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        emailService.sendPasswordChangedNotification(user);
    }

    @Transactional
    public String changeAvatar(MultipartFile avatar, String userId) throws IOException {
        User user = getUser(userId);

        String oldAvatarFileName = user.getAvatarFileName();
        String newAvatarFileName = FileResourceType.generateUserAvatarFileName(user.getId(), new TikaWrapper().detect(avatar.getBytes()));

        s3FileResourceService.uploadUserAvatar(avatar, newAvatarFileName);

        user.setAvatarFileName(newAvatarFileName);
        updateUser(user);

        removeAvatarFromFileStore(oldAvatarFileName);

        return newAvatarFileName;
    }

    @Transactional
    public void removeAvatar(String userId) {
        User user = getUser(userId);

        String oldAvatarFileName = user.getAvatarFileName();

        user.setAvatarFileName(null);
        updateUser(user);
        removeAvatarFromFileStore(oldAvatarFileName);
    }

    public boolean existByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    private void removeAvatarFromFileStore(String filename) {
        if (StringUtils.isNotBlank(filename) &&
            !applicationProperties.getDefaultUserAvatarFileName().equals(filename) &&
            !StringUtils.startsWithAny(filename, "http://", "https://")) {

            s3FileResourceService.removeUserAvatar(filename);
        }
    }

    private void validateUpdateUserData(User existingUser, User userUpdates) {
        Map<String, List<String>> fieldsErrors = new HashMap<>();

        if (!existingUser.getEmail().equals(userUpdates.getEmail()) && existByEmail(userUpdates.getEmail())) {
            fieldsErrors.put(User_.EMAIL, List.of("User with this email already exist."));
        }

        if (!fieldsErrors.isEmpty()) {
            throw new DataNotValidException("Update user data is not valid", fieldsErrors);
        }
    }
}
