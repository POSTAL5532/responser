package com.responser.backend.controller.page;

import com.responser.backend.controller.page.payload.PageInfoDTO;
import com.responser.backend.controller.page.payload.PageDTO;
import com.responser.backend.converter.PageConverter;
import com.responser.backend.model.Page;
import com.responser.backend.service.PagesService;
import com.responser.backend.utils.UrlUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

/**
 * Domain controller for operations with page entities.
 *
 * @author Shcherbachenya Igor
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/pages")
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
        Page newPage = pageConverter.toPage(newPageDTO);
        Page createdPage = pagesService.createPage(newPage);
        return ResponseEntity.ok(pageConverter.toPagePayload(createdPage));
    }
}
