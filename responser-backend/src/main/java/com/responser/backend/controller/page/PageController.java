package com.responser.backend.controller.page;

import com.responser.backend.controller.page.payload.CreatePagePayload;
import com.responser.backend.controller.page.payload.PagePayload;
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
    public ResponseEntity<PagePayload> getPageByUrl(@Valid @NotBlank @RequestParam String url) {
        String preparedUrl = UrlUtils.prepareUrl(url);
        PagePayload pagePayload = pageConverter.toPagePayload(pagesService.getByUrl(preparedUrl));
        return ResponseEntity.ok(pagePayload);
    }

    @PostMapping
    public ResponseEntity<PagePayload> createPage(@Valid @RequestBody CreatePagePayload newPagePayload) {
        Page newPage = pageConverter.toPage(newPagePayload);
        Page createdPage = pagesService.createPage(newPage);
        return ResponseEntity.ok(pageConverter.toPagePayload(createdPage));
    }
}
