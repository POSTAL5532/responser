package com.responser.authserver.controller;

import com.responser.authserver.config.ApplicationProperties;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@Controller
public class CommonController {

    public static final String LOGIN_URL = "/login";
    public static final String LOGOUT_URL = "/logout";
    private static final String SPRING_SECURITY_SAVED_REQUEST = "SPRING_SECURITY_SAVED_REQUEST";
    private static final String USER_FULL_NAME_COOKIE_PARAMETER = "userFullName";

    private final ApplicationProperties applicationProperties;

    @GetMapping(LOGIN_URL)
    public String login(HttpSession session, @CookieValue(name = USER_FULL_NAME_COOKIE_PARAMETER, required = false) String userFullName, Model model) {
        if (StringUtils.isNotBlank(userFullName)) {
            return "redirect:" + applicationProperties.getFrontendAppUrl();
        }

        Object object = session.getAttribute(SPRING_SECURITY_SAVED_REQUEST);

        if (object == null) {
            return "redirect:" + applicationProperties.getSelfHost();
        }

        model.addAttribute("registrationPageUrl", applicationProperties.getRegistrationPageUrl());
        return "login";
    }
}
