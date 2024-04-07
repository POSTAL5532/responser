package space.reviewly.backend.controller.emailConfirmation;

import static space.reviewly.backend.config.ApplicationProperties.API_ROOT_PATH;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.bind.annotation.RequestBody;
import space.reviewly.backend.config.CustomOAuth2AuthenticatedPrincipal;
import space.reviewly.backend.controller.RestApiController;
import space.reviewly.backend.controller.emailConfirmation.payload.ContactFormData;
import space.reviewly.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import space.reviewly.backend.service.email.EmailService;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(API_ROOT_PATH + "/email-confirmation")
public class EmailConfirmationRestController extends RestApiController {

    private final UserService userService;

    private final EmailService emailService;

    @PostMapping("/resend")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> resendConfirmationLink(CustomOAuth2AuthenticatedPrincipal principal) {
        userService.resendConfirmationEmailForUser(principal.getUserId());
        return ResponseEntity.ok().build();
    }

    // TODO: Implement contact form processing with JS validation
    /*@PostMapping("/contact-form")
    public ResponseEntity<Void> submitContactForm(@RequestBody @Valid @NotNull ContactFormData contactFormData) {
        emailService.sendContactFormDataEmail(contactFormData.getName(), contactFormData.getEmail(), contactFormData.getText());
        return ResponseEntity.ok().build();
    }*/
}
