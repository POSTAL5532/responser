package space.reviewly.backend.model.email;

import lombok.Getter;

@Getter
public enum EmailTemplate {
    EMAIL_CONFIRMATION_TEMPLATE("emailConfirmationEmailTemplate"),
    RESTORE_PASSWORD_TEMPLATE("restorePasswordEmailTemplate"),
    PASSWORD_CHANGED_NOTIFICATION_TEMPLATE("passwordChangedNotificationEmailTemplate");

    private final String templateName;

    EmailTemplate(String templateName) {
        this.templateName = templateName;
    }
}
