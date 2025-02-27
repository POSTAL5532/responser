package space.reviewly.backend.controller.emailConfirmation;

import static space.reviewly.backend.config.ApplicationProperties.API_ROOT_PATH;

import space.reviewly.backend.config.CustomOAuth2AuthenticatedPrincipal;
import space.reviewly.backend.controller.RestApiController;
import space.reviewly.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(API_ROOT_PATH + "/email-confirmation")
public class EmailConfirmationRestController extends RestApiController {

    private final UserService userService;

    @PostMapping("/resend")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> resendConfirmationLink(CustomOAuth2AuthenticatedPrincipal principal) {
        log.debug("Resend email confirmation link for user {}.", principal.getUserId());
        userService.resendConfirmationEmailForUser(principal.getUserId());
        return ResponseEntity.ok().build();
    }
}
