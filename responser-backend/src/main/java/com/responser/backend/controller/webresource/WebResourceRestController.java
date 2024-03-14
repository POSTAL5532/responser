package com.responser.backend.controller.webresource;

import static com.responser.backend.config.ApplicationProperties.API_ROOT_PATH;

import com.responser.backend.controller.RestApiController;
import com.responser.backend.controller.webresource.payload.NewWebResourceDTO;
import com.responser.backend.controller.webresource.payload.WebResourceDTO;
import com.responser.backend.converter.WebResourceConverter;
import com.responser.backend.model.ResourceRating;
import com.responser.backend.model.ResourceType;
import com.responser.backend.model.WebResource;
import com.responser.backend.service.RatingService;
import com.responser.backend.service.webResource.WebResourceService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(API_ROOT_PATH + "/web-resources")
public class WebResourceRestController extends RestApiController {

    private final WebResourceService webResourceService;
    private final WebResourceConverter webResourceConverter;
    private final RatingService ratingService;

    @GetMapping
    public ResponseEntity<WebResourceDTO> getWebResourceByUrl(
        @Valid @NotBlank @RequestParam String url,
        @Valid @NotBlank @RequestParam ResourceType resourceType
    ) {
        log.info("Get web resource: url {}, type {}.", url, resourceType);

        WebResource webResource = webResourceService.getByUrl(url, resourceType);
        ResourceRating resourceRating = ratingService.getResourceFullRatingById(webResource.getId());
        WebResourceDTO webResourceDTO = webResourceConverter.toDTO(webResource, resourceRating);

        return ResponseEntity.ok(webResourceDTO);
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<WebResourceDTO> createWebResource(
        @RequestPart("newWebResource") @Valid @NotNull NewWebResourceDTO newWebResourceDTO,
        @RequestPart(value = "siteIcon", required = false) MultipartFile siteIcon
    ) throws IOException {
        log.info("Create web resource {}.", newWebResourceDTO);

        WebResource newWebResource = webResourceService.createWebResource(
            webResourceConverter.toEntity(newWebResourceDTO),
            ObjectUtils.isNotEmpty(siteIcon) ? siteIcon.getBytes() : null
        );

        return ResponseEntity.ok(webResourceConverter.toDTO(newWebResource));
    }
}
