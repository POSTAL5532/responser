package com.responser.backend.service.email;

import static com.responser.backend.config.APIServerApplicationProperties.API_ROOT_PATH;
import static com.responser.backend.controller.emailConfirmation.EmailConfirmationController.CONFIRM_EMAIL_URL;
import static com.responser.backend.controller.emailConfirmation.EmailConfirmationController.EMAIL_CONFIRMATION_URL;

import com.responser.backend.config.APIServerApplicationProperties;
import com.responser.backend.config.RunMode;
import com.responser.backend.model.EmailConfirmation;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.io.FileNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

@RequiredArgsConstructor
@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender emailSender;

    private final APIServerApplicationProperties properties;

    @Override
    public void sendEmailConfirmationMessage(String to, EmailConfirmation emailConfirmation) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(properties.getRunMode().equals(RunMode.PROD) ? to : properties.getMockEmail());
        simpleMailMessage.setSubject("Registration email confirmation");

        simpleMailMessage.setText(
            "Email confirmation: " +
                properties.getSelfHost() +
                EMAIL_CONFIRMATION_URL +
                CONFIRM_EMAIL_URL +
                "/" + emailConfirmation.getId()
        );

        simpleMailMessage.setFrom(properties.getResponserInfoEmail());
        emailSender.send(simpleMailMessage);
    }
}
