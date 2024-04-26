package space.reviewly.backend.service;

import static space.reviewly.backend.controller.emailConfirmation.EmailConfirmationController.EMAIL_CONFIRMATION_URL;

import space.reviewly.backend.config.ApplicationProperties;
import space.reviewly.backend.model.EmailConfirmation;
import space.reviewly.backend.model.PasswordRestore;
import space.reviewly.backend.model.email.EmailContext;
import space.reviewly.backend.model.user.User;
import space.reviewly.backend.model.email.EmailTemplate;
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

    private final ApplicationProperties applicationProperties;

    private final SpringTemplateEngine templateEngine;

    public void sendEmailConfirmationMessage(User user, EmailConfirmation emailConfirmation) {
        Map<String, Object> templateProperties = new HashMap<>();
        templateProperties.put("user", user);
        templateProperties.put(
            "confirmationLink",
            applicationProperties.getSelfHost() + EMAIL_CONFIRMATION_URL + "/" + emailConfirmation.getId()
        );

        EmailContext emailContext = buildEmailContext(
            "Registration email confirmation",
            user.getEmail(),
            EmailTemplate.EMAIL_CONFIRMATION_TEMPLATE,
            templateProperties,
            applicationProperties.getNoReplyEmail()
        );

        try {
            sendEmailMessage(emailContext);
        } catch (MessagingException e) {
            log.error("Send email confirmation fail", e);
            throw new RuntimeException(e);
        }
    }

    public void sendChangedEmailConfirmationMessage(User user, EmailConfirmation emailConfirmation) {
        Map<String, Object> templateProperties = new HashMap<>();
        templateProperties.put("user", user);
        templateProperties.put(
            "confirmationLink",
            applicationProperties.getSelfHost() + EMAIL_CONFIRMATION_URL + "/" + emailConfirmation.getId()
        );

        EmailContext emailContext = buildEmailContext(
            "Email changed",
            user.getEmail(),
            EmailTemplate.CHANGED_EMAIL_CONFIRMATION_TEMPLATE,
            templateProperties,
            applicationProperties.getNoReplyEmail()
        );

        try {
            sendEmailMessage(emailContext);
        } catch (MessagingException e) {
            log.error("Send email confirmation fail", e);
            throw new RuntimeException(e);
        }
    }

    public void sendPasswordRestoringLink(User user, PasswordRestore passwordRestore) {
        Map<String, Object> templateProperties = new HashMap<>();
        templateProperties.put("user", user);
        templateProperties.put(
            "restorePasswordLink",
            applicationProperties.getRestorePasswordPageUrl() + "/" + passwordRestore.getId()
        );

        EmailContext emailContext = buildEmailContext(
            "Restore password",
            user.getEmail(),
            EmailTemplate.RESTORE_PASSWORD_TEMPLATE,
            templateProperties,
            applicationProperties.getNoReplyEmail()
        );

        try {
            sendEmailMessage(emailContext);
        } catch (MessagingException e) {
            log.error("Send email with restore password link fail", e);
            throw new RuntimeException(e);
        }
    }

    public void sendPasswordChangedNotification(User user) {
        Map<String, Object> templateProperties = new HashMap<>();
        templateProperties.put("user", user);

        EmailContext emailContext = buildEmailContext(
            "Password changed",
            user.getEmail(),
            EmailTemplate.PASSWORD_CHANGED_NOTIFICATION_TEMPLATE,
            templateProperties,
            applicationProperties.getNoReplyEmail()
        );

        try {
            sendEmailMessage(emailContext);
        } catch (MessagingException e) {
            log.error("Send email with restore password link fail", e);
            throw new RuntimeException(e);
        }
    }

    public EmailContext buildEmailContext(String subject, String to, EmailTemplate template, Map<String, Object> templateProperties, String fromEmail) {
        EmailContext emailContext = new EmailContext();
        emailContext.setFrom("Reviewly team <" + fromEmail + ">");
        emailContext.setSubject(subject);
        emailContext.setTo(to);
        emailContext.setTemplate(template);

        templateProperties.put("applicationProperties", applicationProperties);
        emailContext.setProperties(templateProperties);

        return emailContext;
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

    /*public AssignmentAndJobDetailsResponsesWrapper getAssignmentAndJobDetailsResponsesWrapperConcurrently(String jobId) {
        AssignmentAndJobDetailsResponsesWrapper responsesWrapper = new AssignmentAndJobDetailsResponsesWrapper();
        ExecutorService executorService = Executors.newFixedThreadPool(2);

        Callable<LegacyJobDetailsResponse> getJobDetails = () -> legacyJobDetailsService.getJobDetails(jobId);
        Callable<AssignmentResponse> getAssignmentResponse = () -> (
            WOM2_JOB_ID_LENGTH == jobId.length()
                ? assignmentService.getAssignmentData(jobId)
                : new AssignmentResponse()
        );

        Future<LegacyJobDetailsResponse> getJobDetailsFuture = executorService.submit(getJobDetails);
        Future<AssignmentResponse> getAssignmentResponseFuture = executorService.submit(getAssignmentResponse);

        try {
            responsesWrapper.setLegacyJobDetailsResponse(getJobDetailsFuture.get());
            responsesWrapper.setAssignmentResponse(getAssignmentResponseFuture.get());
        } catch (ExecutionException exception) {
            log.error("Exception occurred while fetching the job details and assignment response. " + exception.getMessage());
            Throwables.throwIfInstanceOf(exception.getCause(), BellInternalErrorException.class);
            return responsesWrapper;
        } catch (InterruptedException exception) {
            log.error("Multi thread flow exception occurred while fetching the job details and assignment response. " + exception.getMessage());
            return responsesWrapper;
        } finally {
            executorService.shutdownNow();
        }

        return responsesWrapper;
    }*/
}
