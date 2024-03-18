package space.reviewly.backend.controller;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Objects;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReviewlyErrorController implements ErrorController {

    @RequestMapping("/error")
    public String handleError(Model model, HttpServletRequest httpServletRequest) {
        Object status = httpServletRequest.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        Object message = httpServletRequest.getAttribute(RequestDispatcher.ERROR_MESSAGE);

        if (!Objects.isNull(status)) {
            int statusCode = Integer.parseInt(status.toString());
            model.addAttribute("httpStatus", HttpStatus.valueOf(statusCode));
        }

        if (!Objects.isNull(message)) {
            model.addAttribute("errorMessage", message);
        }

        return "error";
    }
}
