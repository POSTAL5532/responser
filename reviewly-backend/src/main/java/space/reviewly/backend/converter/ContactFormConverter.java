package space.reviewly.backend.converter;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import space.reviewly.backend.controller.payload.PageableResponse;
import space.reviewly.backend.controller.userService.payload.ContactFormDTO;
import space.reviewly.backend.controller.userService.payload.CreateContactFormPayload;
import space.reviewly.backend.controller.userService.payload.UpdateContactFormPayload;
import space.reviewly.backend.model.ContactForm;

@Service
public class ContactFormConverter {

    public ContactForm toEntity(CreateContactFormPayload createContactFormPayload) {
        ContactForm contactForm = new ContactForm();
        contactForm.setEmail(createContactFormPayload.getEmail());
        contactForm.setUsername(createContactFormPayload.getUsername());
        contactForm.setText(createContactFormPayload.getText());

        return contactForm;
    }

    public ContactForm toEntity(String id, UpdateContactFormPayload updateContactFormPayload) {
        ContactForm contactForm = new ContactForm();

        contactForm.setEmail(updateContactFormPayload.getEmail());
        contactForm.setUsername(updateContactFormPayload.getUsername());
        contactForm.setText(updateContactFormPayload.getText());
        contactForm.setId(id);
        contactForm.setRead(updateContactFormPayload.getRead());

        return contactForm;
    }

    public ContactFormDTO toPayload(ContactForm contactForm) {
        return ContactFormDTO.builder()
            .id(contactForm.getId())
            .email(contactForm.getEmail())
            .username(contactForm.getUsername())
            .text(contactForm.getText())
            .read(contactForm.isRead())
            .creationDate(contactForm.getCreationDate())
            .updateDate(contactForm.getUpdateDate())
            .build();
    }

    public PageableResponse<ContactFormDTO> toPageablePayloadList(Page<ContactForm> contactFormPage) {
        List<ContactFormDTO> reviewList = contactFormPage.get().map(this::toPayload).collect(Collectors.toList());
        return new PageableResponse<>(
            contactFormPage.getTotalElements(),
            contactFormPage.getTotalPages(),
            contactFormPage.getNumber(),
            contactFormPage.getNumberOfElements(),
            contactFormPage.isLast(),
            contactFormPage.isFirst(),
            contactFormPage.hasPrevious(),
            contactFormPage.hasNext(),
            reviewList
        );
    }
}
