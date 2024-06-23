package space.reviewly.backend.service;

import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import space.reviewly.backend.model.ContactForm;
import space.reviewly.backend.repository.ContactFormRepository;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ContactFormService {

    private final ContactFormRepository contactFormRepository;

    public ContactForm getContactForm(String id) {
        return contactFormRepository.findById(id).orElseThrow(() -> new NoSuchElementException(
            "Contact form with id " + id + " not found"
        ));
    }

    @Transactional
    public ContactForm createContactForm(ContactForm newContactForm) {
        return contactFormRepository.save(newContactForm);
    }

    public Page<ContactForm> getAllContactForm(Pageable pageable) {
        return contactFormRepository.findAll(pageable);
    }

    @Transactional
    public ContactForm updateContactForm(ContactForm updatedContactForm) {
        ContactForm oldContactForm = getContactForm(updatedContactForm.getId());

        oldContactForm.setRead(updatedContactForm.isRead());
        oldContactForm.setText(updatedContactForm.getText());
        oldContactForm.setUsername(updatedContactForm.getUsername());
        oldContactForm.setEmail(updatedContactForm.getEmail());

        return contactFormRepository.save(oldContactForm);
    }
}
