package com.responser.backend.controller.domain;

import com.responser.backend.controller.domain.payload.CreateDomainPayload;
import com.responser.backend.controller.domain.payload.DomainPayload;
import com.responser.backend.converter.DomainConverter;
import com.responser.backend.service.DomainService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

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
        DomainPayload domainPayload = domainConverter.toDomainPayload(domainService.getByUrl(url));
        return ResponseEntity.ok(domainPayload);
    }

    @PostMapping
    public ResponseEntity<Void> createDomain(@Valid @NotNull @RequestBody CreateDomainPayload newDomain) {
        domainService.createDomain(domainConverter.toDomain(newDomain));
        return ResponseEntity.ok().build();
    }
}
