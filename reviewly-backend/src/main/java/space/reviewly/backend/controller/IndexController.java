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
}
