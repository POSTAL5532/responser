package com.responser.backend.service;

import static java.text.MessageFormat.format;

import com.responser.backend.model.PasswordRestore;
import com.responser.backend.repository.PasswordRestoreRepository;
import java.util.NoSuchElementException;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class PasswordRestoreService {

    private final PasswordRestoreRepository passwordRestoreRepository;

    public PasswordRestore getById(String passwordRestoreId) {
        return passwordRestoreRepository.findById(passwordRestoreId).orElseThrow(
            () -> new NoSuchElementException(format("PasswordRestore record with id ''{0}'' doesn't exist", passwordRestoreId))
        );
    }

    @Transactional
    public PasswordRestore createPasswordRestore(String userId) {
        PasswordRestore passwordRestore = passwordRestoreRepository.findByUserId(userId).orElse(null);

        if (Objects.isNull(passwordRestore)) {
            passwordRestore = new PasswordRestore();
            passwordRestore.setUserId(userId);
            passwordRestore = passwordRestoreRepository.save(passwordRestore);
        }

        return passwordRestore;
    }
}
