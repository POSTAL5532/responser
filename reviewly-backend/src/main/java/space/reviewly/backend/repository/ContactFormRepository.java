package space.reviewly.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import space.reviewly.backend.model.ContactForm;

@Repository
public interface ContactFormRepository extends JpaRepository<ContactForm, String> {

}
