package space.reviewly.backend.controller.user;

import static space.reviewly.backend.config.ApplicationProperties.API_ROOT_PATH;

import space.reviewly.backend.config.CustomOAuth2AuthenticatedPrincipal;
import space.reviewly.backend.controller.RestApiController;
import space.reviewly.backend.controller.user.dto.CreateUserProfileDTO;
import space.reviewly.backend.controller.user.dto.ForgotPasswordDTO;
import space.reviewly.backend.controller.user.dto.RestorePasswordDTO;
import space.reviewly.backend.controller.user.dto.UpdateUserPasswordDTO;
import space.reviewly.backend.controller.user.dto.UpdateUserDTO;
import space.reviewly.backend.controller.user.dto.UserDTO;
import space.reviewly.backend.converter.UserConverter;
import space.reviewly.backend.model.user.User;
import space.reviewly.backend.service.RatingService;
import space.reviewly.backend.service.user.UserService;
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
    public ResponseEntity<Void> registerUser(@Valid @RequestBody CreateUserProfileDTO newUser) {
        log.debug("Register new user.");
        userService.registerUser(userConverter.toUser(newUser));
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping
    public ResponseEntity<Void> updateUser(CustomOAuth2AuthenticatedPrincipal principal, @Valid @RequestBody UpdateUserDTO user) {
        log.info("Update current {} user.", principal.getUserId());
        userService.updateUser(principal.getUserId(), userConverter.toUser(user));
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/current")
    public ResponseEntity<UserDTO> getCurrentUser(CustomOAuth2AuthenticatedPrincipal principal) {
        String userId = principal.getUserId();

        log.debug("Get current {} user.", userId);

        User user = userService.getFullUser(userId);
        UserDTO userPayload = userConverter.toUserDTO(user);
        userPayload.setReviewsCommonRating(ratingService.getUserReviewsRating(userId));

        return ResponseEntity.ok(userPayload);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/update-password")
    public ResponseEntity<Void> updatePassword(
        CustomOAuth2AuthenticatedPrincipal principal,
        @Valid @NotNull @RequestBody UpdateUserPasswordDTO updateUserPasswordDTO
    ) {

        log.debug("Update current {} user password.", principal.getUserId());

        userService.updateUserPassword(
            principal.getUserId(),
            updateUserPasswordDTO.getOldPassword(),
            updateUserPasswordDTO.getNewPassword()
        );

        return ResponseEntity.ok().build();
    }

    @PostMapping("/send-restore-password-link")
    public ResponseEntity<Void> sendRestorePasswordLink(@Valid @NotNull @RequestBody ForgotPasswordDTO forgotPasswordDTO) {
        log.debug("Send restoring link for user password with email {}.", forgotPasswordDTO.getEmail());
        userService.requestPasswordRestoring(forgotPasswordDTO.getEmail());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/restore-password")
    public ResponseEntity<Void> restorePassword(@Valid @NotNull @RequestBody RestorePasswordDTO restorePasswordDTO) {
        log.debug("Restore password by password restore: {}.", restorePasswordDTO);
        userService.restorePassword(restorePasswordDTO.getRestorePasswordId(), restorePasswordDTO.getNewPassword());
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/change-avatar")
    public ResponseEntity<String> changeAvatar(
        @RequestParam(value = "avatar") MultipartFile avatar,
        CustomOAuth2AuthenticatedPrincipal principal
    ) throws IOException {

        log.debug("Change user avatar for user: {}", principal.getUserId());
        String avatarFileName = userService.changeAvatar(avatar, principal.getUserId());
        return ResponseEntity.ok(avatarFileName);
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/remove-avatar")
    public ResponseEntity<Void> removeAvatar(CustomOAuth2AuthenticatedPrincipal principal) {
        log.debug("Remove user avatar for user {}", principal.getUserId());
        userService.removeAvatar(principal.getUserId());
        return ResponseEntity.ok().build();
    }
}
