package space.reviewly.backend.controller.webresource;

import static space.reviewly.backend.config.ApplicationProperties.API_ROOT_PATH;

import space.reviewly.backend.controller.RestApiController;
import space.reviewly.backend.controller.webresource.payload.NewWebResourceDTO;
import space.reviewly.backend.controller.webresource.payload.WebResourceDTO;
import space.reviewly.backend.converter.WebResourceConverter;
import space.reviewly.backend.model.webresource.ResourceRating;
import space.reviewly.backend.model.webresource.ResourceType;
import space.reviewly.backend.model.webresource.WebResource;
import space.reviewly.backend.service.RatingService;
import space.reviewly.backend.service.webResource.WebResourceService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        log.debug("Get web resource: url {}, type {}.", url, resourceType);

        WebResource webResource = webResourceService.getByUrl(url, resourceType);
        ResourceRating resourceRating = ratingService.getResourceFullRatingById(webResource.getId());
        WebResourceDTO webResourceDTO = webResourceConverter.toDTO(webResource, resourceRating);

        return ResponseEntity.ok(webResourceDTO);
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<WebResourceDTO> createWebResource(
        @RequestPart("newWebResource") @Valid @NotNull NewWebResourceDTO newWebResourceDTO,
        @RequestPart(value = "siteIcon", required = false) MultipartFile siteIcon
    ) {
        log.debug("Create web resource {}.", newWebResourceDTO);
        WebResource newWebResource = webResourceService.createWebResource(webResourceConverter.toEntity(newWebResourceDTO), siteIcon);
        return ResponseEntity.ok(webResourceConverter.toDTO(newWebResource));
    }
}
