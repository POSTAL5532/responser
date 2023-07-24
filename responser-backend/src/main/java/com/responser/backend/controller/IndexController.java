package com.responser.backend.controller;

import com.responser.backend.config.ApplicationProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@RequiredArgsConstructor
@Controller
public class IndexController {

    private final ApplicationProperties applicationProperties;

    @GetMapping({"/", "/index", "/index.html"})
    public ModelAndView getIndex(ModelAndView modelAndView) {
        modelAndView.setViewName("index");
        modelAndView.addObject("applicationProperties", applicationProperties);

        return modelAndView;
    }
}
