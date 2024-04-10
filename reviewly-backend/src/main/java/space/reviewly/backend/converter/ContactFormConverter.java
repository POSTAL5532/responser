package space.reviewly.backend.converter;

import org.springframework.stereotype.Service;
import space.reviewly.backend.controller.userService.payload.ContactFormPayload;
import space.reviewly.backend.controller.userService.payload.CreateContactFormPayload;
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

    public ContactFormPayload toPayload(ContactForm contactForm) {
        ContactFormPayload contactFormPayload = new ContactFormPayload();
        contactFormPayload.setId(contactForm.getId());
        contactFormPayload.setEmail(contactForm.getEmail());
        contactFormPayload.setUsername(contactForm.getUsername());
        contactFormPayload.setText(contactForm.getText());
        contactFormPayload.setCreationDate(contactForm.getCreationDate());
        contactFormPayload.setUpdateDate(contactForm.getUpdateDate());

        return contactFormPayload;
    }
}
