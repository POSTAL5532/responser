package com.responser.backend.controller.page;

import static com.responser.backend.config.APIServerApplicationProperties.API_ROOT_PATH;

import com.responser.backend.controller.page.payload.PageInfoDTO;
import com.responser.backend.controller.page.payload.PageDTO;
import com.responser.backend.converter.PageConverter;
import com.responser.backend.model.Page;
import com.responser.backend.service.PagesService;
import com.responser.backend.utils.UrlUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

/**
 * Domain controller for operations with page entities.
 *
 * @author Shcherbachenya Igor
 */
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(API_ROOT_PATH + "/pages")
public class PageController {

    private final PagesService pagesService;

    private final PageConverter pageConverter;

    /**
     * Returns {@link PageDTO} by raw url string.
     *
     * @param url raw url string
     * @return {@link PageDTO}
     */
    @GetMapping
    public ResponseEntity<PageDTO> getPageByUrl(@Valid @NotBlank @RequestParam String url) {
        log.info("Get page {}.", url);
        String preparedUrl = UrlUtils.prepareUrl(url);
        PageDTO pageDTO = pageConverter.toPagePayload(pagesService.getByUrl(preparedUrl));
        pageDTO.setRating(pagesService.getPageRating(pageDTO.getId()));
        return ResponseEntity.ok(pageDTO);
    }

    /**
     * Creates new {@link Page} by {@link PageDTO}.
     *
     * @param newPageDTO new page DTO
     * @return {@link PageDTO}
     */
    @PostMapping
    public ResponseEntity<PageDTO> createPage(@Valid @RequestBody PageInfoDTO newPageDTO) {
        log.info("Create page {}.", newPageDTO);
        Page newPage = pageConverter.toPage(newPageDTO);
        Page createdPage = pagesService.createPage(newPage);
        return ResponseEntity.ok(pageConverter.toPagePayload(createdPage));
    }
}
