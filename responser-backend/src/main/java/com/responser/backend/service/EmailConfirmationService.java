package com.responser.backend.service;

import static java.text.MessageFormat.format;

import com.responser.backend.exceptions.EntityAlreadyExistException;
import com.responser.backend.model.EmailConfirmation;
import com.responser.backend.repository.EmailConfirmationRepository;
import java.util.NoSuchElementException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class EmailConfirmationService {

    private final EmailConfirmationRepository emailConfirmationRepository;

    public EmailConfirmation getById(String confirmationId) {
        return emailConfirmationRepository.findById(confirmationId).orElseThrow(
            () -> new NoSuchElementException(format("EmailConfirmation with id ''{0}'' doesn't exist", confirmationId))
        );
    }

    @Transactional
    public EmailConfirmation createEmailConfirmation(String userId) {
        EmailConfirmation newConfirmation = new EmailConfirmation();
        newConfirmation.setUserId(userId);

        if (existByUserId(userId)) {
            throw new EntityAlreadyExistException(format("EmailConfirmation for user ''{0}'' already exist", userId));
        }

        return emailConfirmationRepository.save(newConfirmation);
    }

    @Transactional
    public void deleteConfirmation(String confirmationId) {
        emailConfirmationRepository.deleteById(confirmationId);
    }

    public EmailConfirmation getByUserId(String userId) {
        return emailConfirmationRepository.findByUserId(userId).orElseThrow(
            () -> logAndThrowNoSuchEmailConfirmationForUser(userId)
        );
    }

    public Optional<EmailConfirmation> findByUserId(String userId) {
        return emailConfirmationRepository.findByUserId(userId);
    }

    public boolean existByUserId(String userId) {
        return emailConfirmationRepository.existsByUserId(userId);
    }

    private NoSuchElementException logAndThrowNoSuchEmailConfirmationForUser(String userId) {
        log.error("EmailConfirmation for user {} doesn't exist", userId);
        return new NoSuchElementException(format("EmailConfirmation for user ''{0}'' doesn't exist", userId));
    }
}
