package com.responser.backend.controller.passwordRestore;

import static com.responser.backend.config.ApplicationProperties.API_ROOT_PATH;

import com.responser.backend.controller.user.payload.ForgotPasswordPayload;
import com.responser.backend.service.EmailConfirmationService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * PasswordRestoreController
 *
 * @author Shcherbachenya Igor
 */
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(API_ROOT_PATH + "/password-restore")
public class PasswordRestoreController {

    private final EmailConfirmationService emailConfirmationService;



}
