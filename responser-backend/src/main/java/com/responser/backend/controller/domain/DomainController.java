package com.responser.backend.controller.domain;

import com.responser.backend.controller.domain.payload.DomainInfoDTO;
import com.responser.backend.controller.domain.payload.DomainDTO;
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
 * Domain controller for operations with domain entities.
 *
 * @author Shcherbachenya Igor
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/domains")
public class DomainController {

    private final DomainService domainService;

    private final DomainConverter domainConverter;

    /**
     * Return domain by raw url string.
     *
     * @param url raw url string
     * @return {@link DomainDTO}
     */
    @GetMapping
    public ResponseEntity<DomainDTO> getDomainByUrl(@Valid @NotBlank @RequestParam String url) {
        String preparedUrl = UrlUtils.prepareUrl(url);
        DomainDTO domainDTO = domainConverter.toDomainPayload(domainService.getByUrl(preparedUrl));
        return ResponseEntity.ok(domainDTO);
    }

    /**
     * Creates new domain entity.
     *
     * @param newDomain new domain info
     * @return initialized {@link DomainDTO}
     */
    @PostMapping
    public ResponseEntity<DomainDTO> createDomain(@Valid @NotNull @RequestBody DomainInfoDTO newDomain) {
        Domain createdDomain = domainService.createDomain(domainConverter.toDomain(newDomain));
        return ResponseEntity.ok(domainConverter.toDomainPayload(createdDomain));
    }
}
