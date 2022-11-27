package com.responser.backend.controller.resource;

import com.responser.backend.controller.resource.payload.CreateResourcePayload;
import com.responser.backend.controller.resource.payload.ResourcePayload;
import com.responser.backend.converter.ResourceConverter;
import com.responser.backend.model.Resource;
import com.responser.backend.service.ResourcesService;
import com.responser.backend.utils.UrlUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

/**
 * ResourceController
 *
 * @author SIE
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourcesService resourcesService;

    private final ResourceConverter resourceConverter;

    @GetMapping
    public ResponseEntity<ResourcePayload> getResourceByUrl(@Valid @NotBlank @RequestParam String url) {
        String preparedUrl = UrlUtils.prepareUrl(url);
        ResourcePayload resourcePayload = resourceConverter.toResourcePayload(resourcesService.getByUrl(preparedUrl));
        return ResponseEntity.ok(resourcePayload);
    }

    @PostMapping
    public ResponseEntity<ResourcePayload> createResource(@Valid @RequestBody CreateResourcePayload newResourcePayload) {
        Resource newResource = resourceConverter.toResource(newResourcePayload);
        Resource createdResource = resourcesService.createResource(newResource);
        return ResponseEntity.ok(resourceConverter.toResourcePayload(createdResource));
    }
}
