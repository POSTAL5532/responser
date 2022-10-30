package com.responser.backend.service;

import com.responser.backend.model.Resource;
import com.responser.backend.model.Response;
import com.responser.backend.repository.ResponseRepository;
import com.responser.backend.utils.UrlUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

/**
 * ResponsesService
 *
 * @author SIE
 */
@AllArgsConstructor
@Service
@Transactional(readOnly = true)
public class ResponsesService {

    private final ResponseRepository responseRepository;

    private final ResourcesService resourcesService;

    public List<Response> getAllForResource(String url) {
        String formattedUrl = UrlUtils.prepareUrl(url);
        Resource resource = resourcesService.getByUrl(formattedUrl);
        return responseRepository.findAllByResourceId(resource.getId());
    }

    public void createResponse() {

    }

    public void updateResponse() {

    }
}
