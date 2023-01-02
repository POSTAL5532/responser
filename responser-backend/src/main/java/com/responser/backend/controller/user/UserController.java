package com.responser.backend.controller.user;

import com.responser.backend.controller.user.payload.CreateUserProfilePayload;
import com.responser.backend.controller.user.payload.UpdateUserPayload;
import com.responser.backend.controller.user.payload.UserInfoPayload;
import com.responser.backend.converter.UserConverter;
import com.responser.backend.model.User;
import com.responser.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

/**
 * UserController
 *
 * @author Shcherbachenya Igor
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    private final UserConverter userConverter;

    @PostMapping("/register")
    public ResponseEntity<Void> registerUser(@Valid @RequestBody CreateUserProfilePayload newUser) {
        userService.registerUser(userConverter.toUser(newUser));

        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/updatecurrent")
    public ResponseEntity<Void> updateUser(Principal principal, @Valid @RequestBody UpdateUserPayload user) {
        userService.updateUser(principal.getName(), userConverter.toUser(user));
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/current")
    public ResponseEntity<UserInfoPayload> getCurrentUser(Principal principal) {
        User user = userService.getUser(principal.getName());
        return ResponseEntity.ok(userConverter.toUserInfoPayload(user));
    }
}
