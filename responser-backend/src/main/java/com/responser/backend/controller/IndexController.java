package com.responser.backend.controller;

import com.responser.backend.config.ApplicationProperties;
import java.net.URISyntaxException;
import lombok.RequiredArgsConstructor;
import org.apache.hc.core5.net.URIBuilder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@RequiredArgsConstructor
@Controller
public class IndexController {

    private final ApplicationProperties applicationProperties;

    @GetMapping({"/", "/index", "/index.html"})
    public ModelAndView getIndex(ModelAndView modelAndView) throws URISyntaxException {
        modelAndView.setViewName("index");
        modelAndView.addObject("applicationProperties", applicationProperties);

        URIBuilder loginUrlBuilder = new URIBuilder(applicationProperties.getAuthLoginPageUrl());
        loginUrlBuilder.addParameter("response_type", "code");
        loginUrlBuilder.addParameter("client_id", applicationProperties.getClientId());
        loginUrlBuilder.addParameter("redirect_uri", applicationProperties.getAuthRedirectUri());

        modelAndView.addObject("loginUrl", loginUrlBuilder.build().toString());

        return modelAndView;
    }
}
