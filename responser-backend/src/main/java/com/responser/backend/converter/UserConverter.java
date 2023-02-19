package com.responser.backend.converter;

import com.responser.backend.controller.user.payload.CreateUserProfilePayload;
import com.responser.backend.controller.user.payload.UpdateUserPayload;
import com.responser.backend.controller.user.payload.UserInfoPayload;
import com.responser.backend.model.User;
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
        user.setUserName(newUserPayload.getUserName());
        user.setEmail(newUserPayload.getEmail());
        user.setPassword(newUserPayload.getPassword());
        user.setFullName(newUserPayload.getFullName());

        return user;
    }

    public User toUser(UpdateUserPayload updateUser) {
        User user = new User();
        user.setUserName(updateUser.getUserName());
        user.setEmail(updateUser.getEmail());
        user.setFullName(updateUser.getFullName());

        return user;
    }

    public UserInfoPayload toUserInfoPayload(User user) {
        UserInfoPayload userPayload = new UserInfoPayload();
        userPayload.setId(user.getId());
        userPayload.setUserName(user.getUserName());
        userPayload.setEmail(user.getEmail());
        userPayload.setFullName(user.getFullName());
        userPayload.setCreationDate(user.getCreationDate());
        userPayload.setUpdateDate(user.getUpdateDate());

        return userPayload;
    }
}
