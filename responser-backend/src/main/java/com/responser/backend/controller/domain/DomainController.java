package com.responser.backend.controller.domain;

import com.responser.backend.controller.domain.payload.CreateDomainPayload;
import com.responser.backend.controller.domain.payload.DomainPayload;
import com.responser.backend.converter.DomainConverter;
import com.responser.backend.model.Domain;
import com.responser.backend.service.DomainService;
import com.responser.backend.utils.UrlUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * DomainController
 *
 * @author SIE
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/domains")
public class DomainController {

    private final DomainService domainService;

    private final DomainConverter domainConverter;

    @GetMapping
    public ResponseEntity<DomainPayload> getDomainByUrl(@Valid @NotBlank @RequestParam String url) {
        String preparedUrl = UrlUtils.prepareUrl(url);
        DomainPayload domainPayload = domainConverter.toDomainPayload(domainService.getByUrl(preparedUrl));
        return ResponseEntity.ok(domainPayload);
    }

    @PostMapping
    public ResponseEntity<DomainPayload> createDomain(@Valid @NotNull @RequestBody CreateDomainPayload newDomain) {
        Domain createdDomain = domainService.createDomain(domainConverter.toDomain(newDomain));
        return ResponseEntity.ok(domainConverter.toDomainPayload(createdDomain));
    }
}
