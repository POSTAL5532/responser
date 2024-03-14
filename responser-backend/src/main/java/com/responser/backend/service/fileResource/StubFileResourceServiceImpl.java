package com.responser.backend.service.fileResource;

import java.util.HashMap;
import java.util.Map;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class StubFileResourceServiceImpl implements FileResourceService {

    private static final String RESOURCE_SERVER_URL = "http://localhost:5050";

    private final RestTemplate restTemplate = new RestTemplate();

    private static String getFullUrl(String path) {
        return RESOURCE_SERVER_URL + path;
    }

    public void uploadFile(String url, String parameterName, byte[] file, String fileName) {
        MultiValueMap<String, Object> data = new LinkedMultiValueMap<>();
        ByteArrayResource resource = new ByteArrayResource(file) {
            @Override
            public String getFilename() {
                return fileName;
            }
        };

        data.add(parameterName, resource);
        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(data, requestHeaders);
        restTemplate.exchange(url, HttpMethod.POST, requestEntity, Void.class);
    }

    public void removeFile(String url, String fileName) {
        Map<String, String> params = new HashMap<>();
        params.put("fileName", fileName);
        restTemplate.delete(url + "/{fileName}", params);
    }

    @Override
    public void uploadUserAvatar(byte[] file, String fileName) {
        uploadFile(getFullUrl("/user-avatar"), "newAvatar", file, fileName);
    }

    @Override
    public void removeUserAvatar(String fileName) {
        removeFile(getFullUrl("/delete-user-avatar"), fileName);
    }

    @Override
    public void uploadSiteIcon(byte[] file, String fileName) {
        uploadFile(getFullUrl("/site-icon"), "newSiteIcon", file, fileName);
    }
}
