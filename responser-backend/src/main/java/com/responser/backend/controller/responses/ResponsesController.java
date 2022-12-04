package com.responser.backend.controller.responses;

import com.responser.backend.controller.responses.payload.ResponseDataPayload;
import com.responser.backend.controller.responses.payload.ResponsePayload;
import com.responser.backend.converter.ResponseConverter;
import com.responser.backend.model.Response;
import com.responser.backend.service.ResponsesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @GetMapping("/{responseId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ResponsePayload> getResponse(@Valid @NotBlank @PathVariable String responseId, Principal principal) {
        Response response = responsesService.getResponseByIdAndUser(responseId, principal.getName());
        return ResponseEntity.ok(responseConverter.toResponsePayload(response));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response> createResponse(@Valid @NotNull @RequestBody ResponseDataPayload response, Principal principal) {
        Response newResponse = responseConverter.toResponse(response, principal.getName());
        return ResponseEntity.ok(responsesService.createResponse(newResponse));
    }

    @PutMapping("/{responseId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response> updateResponse(
            @Valid @NotNull @PathVariable String responseId,
            @Valid @NotNull @RequestBody ResponseDataPayload responseDTO,
            Principal principal
    ) {
        Response response = responseConverter.toResponse(responseId, responseDTO, principal.getName());
        return ResponseEntity.ok(responsesService.updateResponse(response));
    }
}
