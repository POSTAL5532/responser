package com.responser.backend.controller.responses;

import com.responser.backend.controller.responses.payload.CreateResponsePayload;
import com.responser.backend.controller.responses.payload.ResponsePayload;
import com.responser.backend.converter.ResponseConverter;
import com.responser.backend.model.Response;
import com.responser.backend.service.ResponsesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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

    private final ResponseConverter responseConverter;

    @GetMapping
    public ResponseEntity<List<ResponsePayload>> getResponsesForResource(@Valid @NotBlank @RequestParam String resourceId) {
        List<Response> responses = responsesService.getAllForResource(resourceId);
        return ResponseEntity.ok(responseConverter.toResponsePayloadList(responses));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response> createResponse(@Valid @NotNull @RequestBody CreateResponsePayload response, Principal principal) {
        Response newResponse = responseConverter.toResponse(response, principal.getName());
        return ResponseEntity.ok(responsesService.createResponse(newResponse));
    }
}
