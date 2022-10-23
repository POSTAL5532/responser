package com.responser.backend.controller;

import com.responser.backend.model.Response;
import com.responser.backend.repository.ResponseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    private final ResponseRepository responseRepository;

    @GetMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<List<Response>> getAllResponses() {
        return ResponseEntity.ok(responseRepository.findAll());
    }
}
