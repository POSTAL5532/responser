package com.responser.authserver.controller;

import com.responser.authserver.config.AuthServerApplicationProperties;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@RequiredArgsConstructor
@Controller
public class CommonController {

    public static final String LOGIN_URL = "/login";
    public static final String LOGOUT_URL = "/logout";
    private static final String SPRING_SECURITY_SAVED_REQUEST = "SPRING_SECURITY_SAVED_REQUEST";

    private final AuthServerApplicationProperties authServerApplicationProperties;

    @GetMapping(LOGIN_URL)
    public ModelAndView login(HttpSession session, ModelAndView modelAndView){
        Object object = session.getAttribute(SPRING_SECURITY_SAVED_REQUEST);

        if (object == null) {
            return new ModelAndView("redirect:" + authServerApplicationProperties.getNoSessionRedirectUrl());
        }

        modelAndView.setViewName("login");
        modelAndView.addObject("registrationPageUrl", authServerApplicationProperties.getRegistrationPageUrl());
        return modelAndView;
    }
}
