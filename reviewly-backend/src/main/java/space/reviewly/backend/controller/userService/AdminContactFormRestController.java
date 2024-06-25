package space.reviewly.backend.controller.userService;

import static space.reviewly.backend.config.ApplicationProperties.ADMIN_API_ROOT_PATH;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import space.reviewly.backend.controller.payload.PageableResponse;
import space.reviewly.backend.controller.payload.Pagination;
import space.reviewly.backend.controller.userService.dto.ContactFormDTO;
import space.reviewly.backend.controller.userService.dto.UpdateContactFormDTO;
import space.reviewly.backend.converter.ContactFormConverter;
import space.reviewly.backend.converter.PaginationConverter;
import space.reviewly.backend.model.ContactForm;
import space.reviewly.backend.service.ContactFormService;

@RequiredArgsConstructor
@RestController
@RequestMapping(ADMIN_API_ROOT_PATH + "/contact-form")
public class AdminContactFormRestController {

    private final ContactFormService contactFormService;

    private final ContactFormConverter contactFormConverter;

    private final PaginationConverter paginationConverter;

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
        @Valid @NotNull @RequestBody UpdateContactFormDTO updateContactFormDTO
    ) {

        ContactForm contactForm = contactFormConverter.toEntity(contactFormId, updateContactFormDTO);
        return ResponseEntity.ok(contactFormConverter.toPayload(contactFormService.updateContactForm(contactForm)));
    }
}
