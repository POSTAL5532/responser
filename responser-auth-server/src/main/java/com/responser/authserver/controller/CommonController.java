package com.responser.authserver.controller;

import com.responser.authserver.config.ApplicationProperties;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@Controller
public class CommonController {

    public static final String LOGIN_URL = "/login";
    public static final String LOGOUT_URL = "/logout";
    private static final String SPRING_SECURITY_SAVED_REQUEST = "SPRING_SECURITY_SAVED_REQUEST";

    private final ApplicationProperties applicationProperties;

    @GetMapping(LOGIN_URL)
    public String login(HttpSession session, Model model){
        Object object = session.getAttribute(SPRING_SECURITY_SAVED_REQUEST);

        if (object == null) {
            return "redirect:" + applicationProperties.getSelfHost();
        }

        model.addAttribute("registrationPageUrl", applicationProperties.getRegistrationPageUrl());
        return "login";
    }
}
