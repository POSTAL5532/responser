package com.responser.authserver.controller;

import com.responser.authserver.config.AuthServerApplicationProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@RequiredArgsConstructor
@Controller
public class CommonController {

    public static final String LOGIN_URL = "/login";
    public static final String LOGOUT_URL = "/logout";

    private final AuthServerApplicationProperties authServerApplicationProperties;

    @GetMapping(LOGIN_URL)
    public ModelAndView login(ModelAndView modelAndView){
        modelAndView.setViewName("login");
        modelAndView.addObject("registrationPageUrl", authServerApplicationProperties.getRegistrationPageUrl());
        return modelAndView;
    }
}
