package com.responser.backend.controller.domain;

import static com.responser.backend.config.APIServerApplicationProperties.API_ROOT_PATH;

import com.responser.backend.controller.domain.payload.DomainInfoDTO;
import com.responser.backend.controller.domain.payload.DomainDTO;
import com.responser.backend.converter.DomainConverter;
import com.responser.backend.model.Domain;
import com.responser.backend.service.DomainService;
import com.responser.backend.utils.UrlUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(API_ROOT_PATH + "/domains")
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
        log.info("Get domain {}.", url);
        String preparedUrl = UrlUtils.prepareUrl(url);
        DomainDTO domainDTO = domainConverter.toDomainPayload(domainService.getByUrl(preparedUrl));
        domainDTO.setRating(domainService.getDomainRating(domainDTO.getId()));
        domainDTO.setReviewsCount(domainService.getDomainReviewsCount(domainDTO.getId()));

        return ResponseEntity.ok(domainDTO);
    }

    /**
     * Returns rating.
     *
     * @param url url
     * @return domain rating
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/rating")
    public ResponseEntity<Double> getDomainRating(@Valid @NotBlank @RequestParam String url) {
        log.info("Get domain rating {}.", url);
        String preparedUrl = UrlUtils.prepareUrl(url);
        Double rating = domainService.getDomainRatingByUrl(preparedUrl);
        return ResponseEntity.ok(rating);
    }

    /**
     * Creates new domain entity.
     *
     * @param newDomain new domain info
     * @return initialized {@link DomainDTO}
     */
    @PostMapping
    public ResponseEntity<DomainDTO> createDomain(@Valid @NotNull @RequestBody DomainInfoDTO newDomain) {
        log.info("Create domain {}.", newDomain);
        Domain createdDomain = domainService.createDomain(domainConverter.toDomain(newDomain));
        return ResponseEntity.ok(domainConverter.toDomainPayload(createdDomain));
    }
}
