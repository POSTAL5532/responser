package space.reviewly.backend.converter;

import java.util.Optional;
import space.reviewly.backend.controller.user.dto.CreateUserProfileDTO;
import space.reviewly.backend.controller.user.dto.UpdateUserDTO;
import space.reviewly.backend.controller.user.dto.UserBasicDTO;
import space.reviewly.backend.controller.user.dto.UserDTO;
import space.reviewly.backend.model.user.RegisteredBy;
import space.reviewly.backend.model.user.Role;
import space.reviewly.backend.model.user.User;
import org.springframework.stereotype.Service;
import space.reviewly.backend.service.user.UserService;

/**
 * UserConverter
 *
 * @author Shcherbachenya Igor
 */
@Service
public class UserConverter {

    public User toUser(CreateUserProfileDTO newUserPayload) {
        User user = new User();
        user.setEmail(newUserPayload.getEmail());
        user.setPassword(newUserPayload.getPassword());
        user.setFullName(newUserPayload.getFullName());

        return user;
    }

    public User toUser(UpdateUserDTO updateUser) {
        User user = new User();
        user.setEmail(updateUser.getEmail());
        user.setFullName(updateUser.getFullName());

        return user;
    }

    public UserBasicDTO toUserBasicDTO(User user) {
        return UserBasicDTO.builder()
            .id(user.getId())
            .fullName(user.getFullName())
            .avatarFileName(user.getAvatarFileName())
            .build();
    }

    public UserDTO toUserDTO(User user) {

        UserDTO.UserDTOBuilder userDTOBuilder = UserDTO.builder()
            .id(user.getId())
            .fullName(user.getFullName())
            .avatarFileName(user.getAvatarFileName())
            .email(user.getEmail())
            .emailConfirmed(user.getEmailConfirmed())
            .registeredBy(user.getRegisteredBy())
            .isUsePasswordStub(
                user.getPassword().equals(UserService.SOCIAL_SIGNUP_USER_PASSWORD_STUB) && user.getRegisteredBy() != RegisteredBy.NATIVE
            )
            .creationDate(user.getCreationDate())
            .updateDate(user.getUpdateDate());

        Optional<Role> roleOptional = user.getRoles().stream().findFirst();

        if (roleOptional.isPresent()) {
            Role role = roleOptional.get();
            userDTOBuilder.isBlocked(role.getName().equals("USER_BLOCKED"));
        }

        return userDTOBuilder.build();
    }
}
