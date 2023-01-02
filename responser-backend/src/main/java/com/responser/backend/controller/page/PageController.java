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
 * PageController
 *
 * @author SIE
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/pages")
public class PageController {

    private final PagesService pagesService;

    private final PageConverter pageConverter;

    @GetMapping
    public ResponseEntity<PageDTO> getPageByUrl(@Valid @NotBlank @RequestParam String url) {
        String preparedUrl = UrlUtils.prepareUrl(url);
        PageDTO pageDTO = pageConverter.toPagePayload(pagesService.getByUrl(preparedUrl));
        return ResponseEntity.ok(pageDTO);
    }

    @PostMapping
    public ResponseEntity<PageDTO> createPage(@Valid @RequestBody PageInfoDTO newPagePayload) {
        Page newPage = pageConverter.toPage(newPagePayload);
        Page createdPage = pagesService.createPage(newPage);
        return ResponseEntity.ok(pageConverter.toPagePayload(createdPage));
    }
}
