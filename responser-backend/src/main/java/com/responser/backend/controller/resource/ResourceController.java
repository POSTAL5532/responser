package com.responser.backend.controller.resource;

import com.responser.backend.controller.resource.payload.CreateResourcePayload;
import com.responser.backend.controller.resource.payload.ResourcePayload;
import com.responser.backend.converter.ResourceConverter;
import com.responser.backend.model.Resource;
import com.responser.backend.service.ResourcesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

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
        ResourcePayload resourcePayload = resourceConverter.toResourcePayload(resourcesService.getByUrl(url));
        return ResponseEntity.ok(resourcePayload);
    }

    @PostMapping
    public ResponseEntity<Void> createResource(@RequestBody CreateResourcePayload newResourcePayload) {
        Resource newResource = resourceConverter.toResource(newResourcePayload);
        resourcesService.createResource(newResource);
        return ResponseEntity.ok().build();
    }
}
