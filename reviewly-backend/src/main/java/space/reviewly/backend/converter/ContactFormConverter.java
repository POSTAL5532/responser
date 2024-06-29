package space.reviewly.backend.converter;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import space.reviewly.backend.controller.payload.PageableResponse;
import space.reviewly.backend.controller.userService.dto.ContactFormDTO;
import space.reviewly.backend.controller.userService.dto.CreateContactFormDTO;
import space.reviewly.backend.controller.userService.dto.UpdateContactFormDTO;
import space.reviewly.backend.model.ContactForm;

@Service
public class ContactFormConverter {

    public ContactForm toEntity(CreateContactFormDTO createContactFormDTO) {
        ContactForm contactForm = new ContactForm();
        contactForm.setEmail(createContactFormDTO.getEmail());
        contactForm.setUsername(createContactFormDTO.getUsername());
        contactForm.setText(createContactFormDTO.getText());

        return contactForm;
    }

    public ContactForm toEntity(String id, UpdateContactFormDTO updateContactFormDTO) {
        ContactForm contactForm = new ContactForm();

        contactForm.setEmail(updateContactFormDTO.getEmail());
        contactForm.setUsername(updateContactFormDTO.getUsername());
        contactForm.setText(updateContactFormDTO.getText());
        contactForm.setId(id);
        contactForm.setRead(updateContactFormDTO.getRead());

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
        List<ContactFormDTO> contactFormDTOList = contactFormPage.get().map(this::toPayload).toList();
        return new PageableResponse<>(
            contactFormPage.getTotalElements(),
            contactFormPage.getTotalPages(),
            contactFormPage.getNumber(),
            contactFormPage.getNumberOfElements(),
            contactFormPage.isLast(),
            contactFormPage.isFirst(),
            contactFormPage.hasPrevious(),
            contactFormPage.hasNext(),
            contactFormDTOList
        );
    }
}
