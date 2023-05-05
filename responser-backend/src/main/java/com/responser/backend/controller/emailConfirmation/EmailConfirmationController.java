package com.responser.backend.controller.emailConfirmation;

import static com.responser.backend.config.APIServerApplicationProperties.API_ROOT_PATH;

import com.responser.backend.config.APIServerApplicationProperties;
import com.responser.backend.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.security.Principal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@RequiredArgsConstructor
@Controller
@RequestMapping(EmailConfirmationController.EMAIL_CONFIRMATION_URL)
public class EmailConfirmationController {

    public static final String EMAIL_CONFIRMATION_URL = API_ROOT_PATH + "/email-confirmation";
    public static final String CONFIRM_EMAIL_URL = "/confirm";

    private final UserService userService;

    private final APIServerApplicationProperties apiServerApplicationProperties;

    @GetMapping(CONFIRM_EMAIL_URL + "/{confirmationId}")
    public ModelAndView confirmEmail(ModelAndView modelAndView, @Valid @NotBlank @PathVariable String confirmationId) {
        userService.confirmEmail(confirmationId);
        modelAndView.addObject("redirectLink", apiServerApplicationProperties.getFeApplicationUrl());
        modelAndView.setViewName("emailConfirmation");
        return modelAndView;
    }

    @ResponseBody
    @PostMapping("/resend")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> resendConfirmationLink(Principal principal) {
        userService.resendConfirmationEmailForUser(principal.getName());
        return ResponseEntity.ok().build();
    }
}
