package space.reviewly.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@Controller
public class IndexController {

    @GetMapping({"/", "/index", "/index.html"})
    public String getIndex() {
        return "index";
    }

    @GetMapping({"/cookie-policy"})
    public String getCookiePolicy() {
        return "cookiePolicy";
    }

    @GetMapping({"/privacy-policy"})
    public String getPrivacyPolicy() {
        return "privacyPolicy";
    }
}
