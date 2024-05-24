package space.reviewly.backend.converter;

import space.reviewly.backend.controller.user.payload.CreateUserProfilePayload;
import space.reviewly.backend.controller.user.payload.UpdateUserPayload;
import space.reviewly.backend.controller.user.payload.UserInfoPayload;
import space.reviewly.backend.model.user.RegisteredBy;
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

    public User toUser(CreateUserProfilePayload newUserPayload) {
        User user = new User();
        user.setEmail(newUserPayload.getEmail());
        user.setPassword(newUserPayload.getPassword());
        user.setFullName(newUserPayload.getFullName());

        return user;
    }

    public User toUser(UpdateUserPayload updateUser) {
        User user = new User();
        user.setEmail(updateUser.getEmail());
        user.setFullName(updateUser.getFullName());

        return user;
    }

    public UserInfoPayload toUserInfoPayload(User user) {
        UserInfoPayload userPayload = new UserInfoPayload();
        userPayload.setId(user.getId());
        userPayload.setFullName(user.getFullName());
        userPayload.setAvatarFileName(user.getAvatarFileName());

        return userPayload;
    }

    public UserInfoPayload toFullUserInfoPayload(User user) {
        UserInfoPayload userPayload = toUserInfoPayload(user);

        userPayload.setEmail(user.getEmail());
        userPayload.setEmailConfirmed(user.getEmailConfirmed());
        userPayload.setRegisteredBy(user.getRegisteredBy());
        userPayload.setIsUsePasswordStub(
            user.getPassword().equals(UserService.SOCIAL_SIGNUP_USER_PASSWORD_STUB) && user.getRegisteredBy() != RegisteredBy.NATIVE
        );
        userPayload.setCreationDate(user.getCreationDate());
        userPayload.setUpdateDate(user.getUpdateDate());

        return userPayload;
    }
}
