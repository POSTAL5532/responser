package space.reviewly.backend.controller;

import space.reviewly.backend.config.ApplicationProperties;
import java.net.URISyntaxException;
import lombok.RequiredArgsConstructor;
import org.apache.hc.core5.net.URIBuilder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.ModelAttribute;

@RequiredArgsConstructor
@ControllerAdvice
public class CommonViewAttributes {

    private static final String USER_FULL_NAME_COOKIE_PARAMETER = "userFullName";

    private final ApplicationProperties applicationProperties;

    @ModelAttribute
    public void setLoginUrl(Model model, @CookieValue(name = USER_FULL_NAME_COOKIE_PARAMETER, required = false) String userFullName) throws URISyntaxException {
        URIBuilder loginUrlBuilder = new URIBuilder(applicationProperties.getAuthLoginPageUrl());
        loginUrlBuilder.addParameter("response_type", "code");
        loginUrlBuilder.addParameter("client_id", applicationProperties.getClientId());
        loginUrlBuilder.addParameter("redirect_uri", applicationProperties.getAuthRedirectUri());

        model.addAttribute("loginUrl", loginUrlBuilder.build().toString());
        model.addAttribute(USER_FULL_NAME_COOKIE_PARAMETER, userFullName);
    }
}
