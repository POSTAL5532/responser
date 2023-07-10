package com.responser.backend.service.email;

import static com.responser.backend.controller.emailConfirmation.EmailConfirmationController.EMAIL_CONFIRMATION_URL;

import com.responser.backend.config.APIServerApplicationProperties;
import com.responser.backend.model.EmailConfirmation;
import com.responser.backend.model.email.EmailContext;
import com.responser.backend.model.User;
import com.responser.backend.model.email.EmailTemplate;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmailService {

    private static final String HTML_SUFFIX = ".html";

    private final JavaMailSender emailSender;

    private final APIServerApplicationProperties applicationProperties;

    private final SpringTemplateEngine templateEngine;

    public void sendEmailConfirmationMessage(User user, EmailConfirmation emailConfirmation) {
        EmailContext emailContext = new EmailContext();
        emailContext.setFrom(applicationProperties.getResponserInfoEmail());
        emailContext.setSubject("Reviewly registration email confirmation");
        emailContext.setTo(user.getEmail());
        emailContext.setTemplate(EmailTemplate.EMAIL_CONFIRMATION_TEMPLATE);

        Map<String, Object> templateProperties = new HashMap<>();
        templateProperties.put("user", user);
        templateProperties.put(
            "confirmationLink",
            applicationProperties.getSelfHost() + EMAIL_CONFIRMATION_URL + "/" + emailConfirmation.getId()
        );

        emailContext.setProperties(templateProperties);

        try {
            sendEmailMessage(emailContext);
        } catch (MessagingException e) {
            log.error("Send email confirmation fail", e);
            throw new RuntimeException(e);
        }
    }

    public void sendEmailMessage(EmailContext email) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

        Context context = new Context();
        context.setVariables(email.getProperties());

        String templateName = "emailtemplates/" + email.getTemplate().getTemplateName();

        if (!StringUtils.endsWith(templateName, HTML_SUFFIX)) {
            templateName += HTML_SUFFIX;
        }

        helper.setFrom(email.getFrom());
        helper.setTo(email.getTo());
        helper.setSubject(email.getSubject());
        helper.setText(templateEngine.process(templateName, context), true);

        emailSender.send(message);
    }
}
