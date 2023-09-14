package com.responser.backend.controller.user;

import static com.responser.backend.config.ApplicationProperties.API_ROOT_PATH;

import com.responser.backend.controller.RestApiController;
import com.responser.backend.controller.user.payload.CreateUserProfilePayload;
import com.responser.backend.controller.user.payload.ForgotPasswordPayload;
import com.responser.backend.controller.user.payload.RestorePasswordPayload;
import com.responser.backend.controller.user.payload.UpdateUserPasswordPayload;
import com.responser.backend.controller.user.payload.UpdateUserPayload;
import com.responser.backend.controller.user.payload.UserInfoPayload;
import com.responser.backend.converter.UserConverter;
import com.responser.backend.model.User;
import com.responser.backend.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import org.springframework.web.multipart.MultipartFile;

/**
 * UserController
 *
 * @author Shcherbachenya Igor
 */
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(API_ROOT_PATH + "/users")
public class UserRestController extends RestApiController {

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

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/update-password")
    public ResponseEntity<Void> updatePassword(Principal principal, @Valid @NotNull @RequestBody UpdateUserPasswordPayload updateUserPasswordPayload) {
        log.info("Update current {} user password.", principal.getName());

        userService.updateUserPassword(
            principal.getName(),
            updateUserPasswordPayload.getOldPassword(),
            updateUserPasswordPayload.getNewPassword()
        );

        return ResponseEntity.ok().build();
    }

    @PostMapping("/send-restore-password-link")
    public ResponseEntity<Void> sendRestorePasswordLink(@Valid @NotNull @RequestBody ForgotPasswordPayload forgotPasswordPayload) {
        log.info("Send restoring link for user password with email {}.", forgotPasswordPayload.getEmail());
        userService.requestPasswordRestoring(forgotPasswordPayload.getEmail());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/restore-password")
    public ResponseEntity<Void> restorePassword(@Valid @NotNull @RequestBody RestorePasswordPayload restorePasswordPayload) {
        log.info("Restore password by password restore: {}.", restorePasswordPayload);
        userService.restorePassword(restorePasswordPayload.getRestorePasswordId(), restorePasswordPayload.getNewPassword());
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/change-avatar")
    public ResponseEntity<String> handleFileUpload(@RequestParam(value = "avatar") MultipartFile avatar, Principal principal) throws IOException {
        log.info("Change user avatar for user: {}", principal.getName());
        String avatarFileName = userService.changeAvatar(avatar.getBytes(), principal.getName());
        return ResponseEntity.ok(avatarFileName);
    }
}
