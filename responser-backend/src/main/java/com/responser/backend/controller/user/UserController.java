package com.responser.backend.controller.user;

import static com.responser.backend.config.APIServerApplicationProperties.API_ROOT_PATH;

import com.responser.backend.controller.user.payload.CreateUserProfilePayload;
import com.responser.backend.controller.user.payload.UpdateUserPayload;
import com.responser.backend.controller.user.payload.UserInfoPayload;
import com.responser.backend.converter.UserConverter;
import com.responser.backend.model.User;
import com.responser.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

/**
 * UserController
 *
 * @author Shcherbachenya Igor
 */
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(API_ROOT_PATH + "/users")
public class UserController {

    private final UserService userService;

    private final UserConverter userConverter;

    @PostMapping
    public ResponseEntity<Void> registerUser(@Valid @RequestBody CreateUserProfilePayload newUser) {
        log.info("Register new user.");
        userService.registerUser(userConverter.toUser(newUser));
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping
    public ResponseEntity<Void> updateUser(Principal principal, @Valid @RequestBody UpdateUserPayload user) {
        log.info("Update current {} user.", principal.getName());
        userService.updateUser(principal.getName(), userConverter.toUser(user));
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/current")
    public ResponseEntity<UserInfoPayload> getCurrentUser(Principal principal) {
        log.info("Get current {} user.", principal.getName());
        User user = userService.getUser(principal.getName());
        return ResponseEntity.ok(userConverter.toFullUserInfoPayload(user));
    }
}
