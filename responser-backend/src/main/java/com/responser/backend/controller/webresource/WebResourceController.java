package com.responser.backend.controller.webresource;

import static com.responser.backend.config.APIServerApplicationProperties.API_ROOT_PATH;

import com.responser.backend.controller.webresource.payload.NewWebResourceDTO;
import com.responser.backend.controller.webresource.payload.WebResourceDTO;
import com.responser.backend.converter.WebResourceConverter;
import com.responser.backend.model.ResourceType;
import com.responser.backend.model.WebResource;
import com.responser.backend.service.WebResourceService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(API_ROOT_PATH + "/web-resources")
public class WebResourceController {

    private final WebResourceService webResourceService;

    private final WebResourceConverter webResourceConverter;

    @GetMapping
    public ResponseEntity<WebResourceDTO> getWebResourceByUrl(
        @Valid @NotBlank @RequestParam String url,
        @Valid @NotBlank @RequestParam ResourceType resourceType
    ) {
        log.info("Get web resource: url {}, type {}.", url, resourceType);

        WebResource webResource = webResourceService.getByUrl(url, resourceType);

        WebResourceDTO webResourceDTO = webResourceConverter.toDTO(webResource);
        webResourceDTO.setRating(webResourceService.getRatingById(webResource.getId()));
        webResourceDTO.setReviewsCount(webResourceService.getReviewsCount(webResource.getId()));

        return ResponseEntity.ok(webResourceDTO);
    }

    @PostMapping
    public ResponseEntity<WebResourceDTO> createWebResource(@Valid @NotNull @RequestBody NewWebResourceDTO newWebResourceDTO) {
        log.info("Create web resource {}.", newWebResourceDTO);

        WebResource newWebResource = webResourceService.createWebResource(
            webResourceConverter.toEntity(newWebResourceDTO)
        );

        return ResponseEntity.ok(webResourceConverter.toDTO(newWebResource));
    }
}
