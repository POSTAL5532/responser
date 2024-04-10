package space.reviewly.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "contact_form")
public class ContactForm extends AbstractEntity {

    private String username;

    private String email;

    private String text;
}
