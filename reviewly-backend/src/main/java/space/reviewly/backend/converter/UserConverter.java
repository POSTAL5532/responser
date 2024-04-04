package space.reviewly.backend.converter;

import space.reviewly.backend.controller.user.payload.CreateUserProfilePayload;
import space.reviewly.backend.controller.user.payload.UpdateUserPayload;
import space.reviewly.backend.controller.user.payload.UserInfoPayload;
import space.reviewly.backend.model.User;
import org.springframework.stereotype.Service;

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
        userPayload.setCreationDate(user.getCreationDate());
        userPayload.setUpdateDate(user.getUpdateDate());

        return userPayload;
    }
}
