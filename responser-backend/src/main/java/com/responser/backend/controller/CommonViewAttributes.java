package com.responser.backend.controller;

import com.responser.backend.config.ApplicationProperties;
import java.net.URISyntaxException;
import lombok.RequiredArgsConstructor;
import org.apache.hc.core5.net.URIBuilder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@RequiredArgsConstructor
@ControllerAdvice
public class CommonViewAttributes {

    private final ApplicationProperties applicationProperties;

    @ModelAttribute()
    public void setLoginUrl(Model model) throws URISyntaxException {
        URIBuilder loginUrlBuilder = new URIBuilder(applicationProperties.getAuthLoginPageUrl());
        loginUrlBuilder.addParameter("response_type", "code");
        loginUrlBuilder.addParameter("client_id", applicationProperties.getClientId());
        loginUrlBuilder.addParameter("redirect_uri", applicationProperties.getAuthRedirectUri());

        model.addAttribute("loginUrl", loginUrlBuilder.build().toString());
    }
}
