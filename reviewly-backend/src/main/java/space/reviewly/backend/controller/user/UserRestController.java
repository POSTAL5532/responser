package space.reviewly.backend.controller.user;

import static space.reviewly.backend.config.ApplicationProperties.API_ROOT_PATH;

import space.reviewly.backend.config.CustomOAuth2AuthenticatedPrincipal;
import space.reviewly.backend.controller.RestApiController;
import space.reviewly.backend.controller.user.payload.CreateUserProfilePayload;
import space.reviewly.backend.controller.user.payload.ForgotPasswordPayload;
import space.reviewly.backend.controller.user.payload.RestorePasswordPayload;
import space.reviewly.backend.controller.user.payload.UpdateUserPasswordPayload;
import space.reviewly.backend.controller.user.payload.UpdateUserPayload;
import space.reviewly.backend.controller.user.payload.UserInfoPayload;
import space.reviewly.backend.converter.UserConverter;
import space.reviewly.backend.model.user.User;
import space.reviewly.backend.service.RatingService;
import space.reviewly.backend.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    private final RatingService ratingService;

    @PostMapping
    public ResponseEntity<Void> registerUser(@Valid @RequestBody CreateUserProfilePayload newUser) {
        log.info("Register new user.");
        userService.registerUser(userConverter.toUser(newUser));
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping
    public ResponseEntity<Void> updateUser(CustomOAuth2AuthenticatedPrincipal principal, @Valid @RequestBody UpdateUserPayload user) {
        log.info("Update current {} user.", principal.getUserId());
        userService.updateUser(principal.getUserId(), userConverter.toUser(user));
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/current")
    public ResponseEntity<UserInfoPayload> getCurrentUser(CustomOAuth2AuthenticatedPrincipal principal) {
        String userId = principal.getUserId();

        log.info("Get current {} user.", userId);

        User user = userService.getUser(userId);
        UserInfoPayload userPayload = userConverter.toFullUserInfoPayload(user);
        userPayload.setReviewsCommonRating(ratingService.getUserReviewsRating(userId));

        return ResponseEntity.ok(userPayload);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/update-password")
    public ResponseEntity<Void> updatePassword(
        CustomOAuth2AuthenticatedPrincipal principal,
        @Valid @NotNull @RequestBody UpdateUserPasswordPayload updateUserPasswordPayload
    ) {

        log.info("Update current {} user password.", principal.getUserId());

        userService.updateUserPassword(
            principal.getUserId(),
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
    public ResponseEntity<String> changeAvatar(
        @RequestParam(value = "avatar") MultipartFile avatar,
        CustomOAuth2AuthenticatedPrincipal principal
    ) throws IOException {

        log.info("Change user avatar for user: {}", principal.getUserId());
        String avatarFileName = userService.changeAvatar(avatar, principal.getUserId());
        return ResponseEntity.ok(avatarFileName);
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/remove-avatar")
    public ResponseEntity<Void> removeAvatar(CustomOAuth2AuthenticatedPrincipal principal) {
        log.info("Remove user avatar for user {}", principal.getUserId());
        userService.removeAvatar(principal.getUserId());
        return ResponseEntity.ok().build();
    }
}
