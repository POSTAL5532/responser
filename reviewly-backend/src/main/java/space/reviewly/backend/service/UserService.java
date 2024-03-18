package space.reviewly.backend.service;

import space.reviewly.backend.config.ApplicationProperties;
import space.reviewly.backend.exceptions.DataNotValidException;
import space.reviewly.backend.model.EmailConfirmation;
import space.reviewly.backend.model.PasswordRestore;
import space.reviewly.backend.model.User;
import space.reviewly.backend.model.User_;
import space.reviewly.backend.repository.UserRepository;
import space.reviewly.backend.service.email.EmailService;
import space.reviewly.backend.service.fileResource.FileResourceService;
import space.reviewly.backend.service.fileResource.FileResourceType;
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

    private final UserRepository userRepository;

    private final EmailService emailService;

    private final EmailConfirmationService emailConfirmationService;

    private final PasswordRestoreService passwordRestoreService;

    private final PasswordEncoder passwordEncoder;

    private final FileResourceService fileResourceService;

    private final ApplicationProperties applicationProperties;

    public User getUser(String userId) {
        return userRepository.findById(userId).orElseThrow(() -> {
            log.error("User with id {} doesn't exist", userId);
            return new NoSuchElementException(format("User with id ''{0}'' doesn't exist", userId));
        });
    }

    @Transactional
    public void registerUser(User newUser) {
        log.info("Register new not confirmed user: {}", newUser.getUserName());

        newUser.setEmailConfirmed(false);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));

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

        if (!user.getUserName().equals(userUpdates.getUserName())) {
            user.setUserName(userUpdates.getUserName());
        }

        if (!user.getEmail().equals(userUpdates.getEmail())) {
            user.setEmail(userUpdates.getEmail());

            EmailConfirmation emailConfirmation = emailConfirmationService
                .findByUserId(userId)
                .orElseGet(() -> emailConfirmationService.createEmailConfirmation(userId));

            emailService.sendEmailConfirmationMessage(user, emailConfirmation);
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

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            Map<String, List<String>> fieldsErrors = new HashMap<>();
            fieldsErrors.put("oldPassword", List.of("Old password is not valid."));
            throw new DataNotValidException("Update user password fail", fieldsErrors);
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        updateUser(user);
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
    public String changeAvatar(byte[] avatar, String userId) {
        User user = getUser(userId);

        String oldAvatarFileName = user.getAvatarFileName();
        String newAvatarFileName = FileResourceType.generateUserAvatarFileName(user.getId(), new TikaWrapper().detect(avatar));

        fileResourceService.uploadUserAvatar(avatar, newAvatarFileName);

        user.setAvatarFileName(newAvatarFileName);
        updateUser(user);

        if (StringUtils.isNotBlank(oldAvatarFileName) && !applicationProperties.getDefaultUserAvatarFileName().equals(oldAvatarFileName)) {
            fileResourceService.removeUserAvatar(oldAvatarFileName);
        }

        return newAvatarFileName;
    }

    @Transactional
    public String removeAvatar(String userId) {
        User user = getUser(userId);

        String oldAvatarFileName = user.getAvatarFileName();
        String newAvatarFileName = applicationProperties.getDefaultUserAvatarFileName();

        user.setAvatarFileName(null);
        updateUser(user);

        if (StringUtils.isNotBlank(oldAvatarFileName) && !applicationProperties.getDefaultUserAvatarFileName().equals(oldAvatarFileName)) {
            fileResourceService.removeUserAvatar(oldAvatarFileName);
        }

        return newAvatarFileName;
    }

    public boolean existByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existByUserName(String username) {
        return userRepository.existsByUserName(username);
    }

    public void validateUpdateUserData(User existingUser, User userUpdates) {
        Map<String, List<String>> fieldsErrors = new HashMap<>();

        if (!existingUser.getUserName().equals(userUpdates.getUserName()) && existByUserName(userUpdates.getUserName())) {
            fieldsErrors.put(User_.USER_NAME, List.of("User with this username already exist."));
        }

        if (!existingUser.getEmail().equals(userUpdates.getEmail()) && existByEmail(userUpdates.getEmail())) {
            fieldsErrors.put(User_.EMAIL, List.of("User with this email already exist."));
        }

        if (!fieldsErrors.isEmpty()) {
            throw new DataNotValidException("Update user data is not valid", fieldsErrors);
        }
    }
}
