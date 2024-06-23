package space.reviewly.backend.controller.userService;

import static space.reviewly.backend.config.ApplicationProperties.API_ROOT_PATH;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import space.reviewly.backend.controller.RestApiController;
import space.reviewly.backend.controller.payload.PageableResponse;
import space.reviewly.backend.controller.payload.Pagination;
import space.reviewly.backend.controller.userService.payload.ContactFormDTO;
import space.reviewly.backend.controller.userService.payload.CreateContactFormPayload;
import space.reviewly.backend.controller.userService.payload.UpdateContactFormPayload;
import space.reviewly.backend.converter.ContactFormConverter;
import space.reviewly.backend.converter.PaginationConverter;
import space.reviewly.backend.model.ContactForm;
import space.reviewly.backend.service.ContactFormService;

@RequiredArgsConstructor
@RestController
@RequestMapping(API_ROOT_PATH + "/contact-form")
public class ContactFormController extends RestApiController {

    private final ContactFormService contactFormService;

    private final ContactFormConverter contactFormConverter;

    private final PaginationConverter paginationConverter;

    @PostMapping
    public ResponseEntity<Void> submitContactForm(@RequestBody @Valid @NotNull CreateContactFormPayload createContactFormPayload) {
        contactFormService.createContactForm(contactFormConverter.toEntity(createContactFormPayload));
        return ResponseEntity.ok().build();
    }

    @GetMapping
    @PreAuthorize("hasAuthority('SEE_CONTACT_FORMS')")
    public ResponseEntity<PageableResponse<ContactFormDTO>> getAllContactForm(@Valid @NotNull Pagination pagination) {
        Page<ContactForm> contactForms = contactFormService.getAllContactForm(paginationConverter.toPageable(pagination));
        return ResponseEntity.ok(contactFormConverter.toPageablePayloadList(contactForms));
    }

    @PutMapping("/{contactFormId}")
    @PreAuthorize("hasAuthority('CHANGE_CONTACT_FORMS')")
    public ResponseEntity<ContactFormDTO> updateContactForm(
        @Valid @NotNull @PathVariable String contactFormId,
        @Valid @NotNull @RequestBody UpdateContactFormPayload updateContactFormPayload
    ) {

        ContactForm contactForm = contactFormConverter.toEntity(contactFormId, updateContactFormPayload);
        return ResponseEntity.ok(contactFormConverter.toPayload(contactFormService.updateContactForm(contactForm)));
    }
}
