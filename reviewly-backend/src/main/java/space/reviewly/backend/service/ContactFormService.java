package space.reviewly.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import space.reviewly.backend.model.ContactForm;
import space.reviewly.backend.repository.ContactFormRepository;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ContactFormService {

    private final ContactFormRepository contactFormRepository;

    @Transactional
    public ContactForm createContactForm(ContactForm newContactForm) {
        return contactFormRepository.save(newContactForm);
    }
}
