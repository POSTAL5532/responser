package space.reviewly.authserver.model.email;

import lombok.Getter;

@Getter
public enum EmailTemplate {
    REGISTRATION_CONFIRMATION_TEMPLATE("registrationConfirmationEmailTemplate");

    private final String templateName;

    EmailTemplate(String templateName) {
        this.templateName = templateName;
    }
}
