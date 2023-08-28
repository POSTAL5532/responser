package com.responser.backend.model.email;

public enum EmailTemplate {
    EMAIL_CONFIRMATION_TEMPLATE("emailConfirmationEmailTemplate"),
    RESTORE_PASSWORD_TEMPLATE("restorePasswordEmailTemplate");

    private final String templateName;

    EmailTemplate(String templateName) {
        this.templateName = templateName;
    }

    public String getTemplateName() {
        return templateName;
    }
}
