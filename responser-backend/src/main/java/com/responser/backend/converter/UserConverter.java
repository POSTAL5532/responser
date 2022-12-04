package com.responser.backend.converter;

import com.responser.backend.controller.user.payload.CreateUserProfilePayload;
import com.responser.backend.controller.user.payload.UpdateUserPayload;
import com.responser.backend.controller.user.payload.UserInfoPayload;
import com.responser.backend.model.User;
import org.springframework.stereotype.Service;

/**
 * UserConverter
 *
 * @author SIE
 */
@Service
public class UserConverter {

    public User toUser(CreateUserProfilePayload newUserPayload) {
        User user = new User();
        user.setUserName(newUserPayload.getUserName());
        user.setEmail(newUserPayload.getEmail());
        user.setPassword(newUserPayload.getPassword());
        user.setFirstName(newUserPayload.getFirstName());
        user.setLastName(newUserPayload.getLastName());

        return user;
    }

    public User toUser(UpdateUserPayload updateUser) {
        User user = new User();
        user.setUserName(updateUser.getUserName());
        user.setEmail(updateUser.getEmail());
        user.setFirstName(updateUser.getFirstName());
        user.setLastName(updateUser.getLastName());

        return user;
    }

    public UserInfoPayload toUserInfoPayload(User user) {
        UserInfoPayload userPayload = new UserInfoPayload();
        userPayload.setId(user.getId());
        userPayload.setUserName(user.getUserName());
        userPayload.setEmail(user.getEmail());
        userPayload.setFirstName(user.getFirstName());
        userPayload.setLastName(user.getLastName());
        userPayload.setCreationDate(user.getCreationDate());
        userPayload.setUpdateDate(user.getUpdateDate());

        return userPayload;
    }
}
