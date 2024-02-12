package com.responser.backend.controller.emailConfirmation;

import com.responser.backend.config.ApplicationProperties;
import com.responser.backend.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping(EmailConfirmationController.EMAIL_CONFIRMATION_URL)
public class EmailConfirmationController {

    public static final String EMAIL_CONFIRMATION_URL = "/email-confirmation";

    private final UserService userService;

    private final ApplicationProperties applicationProperties;

    @GetMapping("/{confirmationId}")
    public String confirmEmailPage(Model model, @Valid @NotBlank @PathVariable String confirmationId) {
        userService.confirmEmail(confirmationId);
        model.addAttribute("redirectLink", applicationProperties.getFeApplicationUrl());
        return "redirect:" + applicationProperties.getProfilePageUrl();
    }
}
