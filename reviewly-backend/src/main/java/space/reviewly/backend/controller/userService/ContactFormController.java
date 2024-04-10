package space.reviewly.backend.controller.userService;

import static space.reviewly.backend.config.ApplicationProperties.API_ROOT_PATH;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import space.reviewly.backend.controller.RestApiController;
import space.reviewly.backend.controller.userService.payload.CreateContactFormPayload;
import space.reviewly.backend.converter.ContactFormConverter;
import space.reviewly.backend.service.ContactFormService;

@RequiredArgsConstructor
@RestController
@RequestMapping(API_ROOT_PATH + "/contact-form")
public class ContactFormController extends RestApiController {

    private final ContactFormService contactFormService;

    private final ContactFormConverter contactFormConverter;

    @PostMapping
    public ResponseEntity<Void> submitContactForm(@RequestBody @Valid @NotNull CreateContactFormPayload createContactFormPayload) {
        contactFormService.createContactForm(contactFormConverter.toEntity(createContactFormPayload));
        return ResponseEntity.ok().build();
    }
}
