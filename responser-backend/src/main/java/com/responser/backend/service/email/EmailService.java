package com.responser.backend.service.email;

import com.responser.backend.model.EmailConfirmation;

public interface EmailService {

    void sendEmailConfirmationMessage(String to, EmailConfirmation emailConfirmation);
}
