package com.responser.backend.controller.responses;

import com.responser.backend.model.Response;
import com.responser.backend.service.ResponsesService;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.constraints.URL;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.security.Principal;
import java.util.List;

/**
 * ResponsesController
 *
 * @author SIE
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/responses")
public class ResponsesController {

    private final ResponsesService responsesService;

    @GetMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<List<Response>> getResponsesForResource(@Valid @NotBlank @URL @RequestParam String url) {
        return ResponseEntity.ok(responsesService.getAllForResource(url));
    }

    @PostMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<String> createResponse(@Valid CreateResponsePayload newResponse, Principal principal) {

        return null;
    }
}
