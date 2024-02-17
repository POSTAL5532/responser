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

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public void uploadFile(byte[] file, String fileName) {
        MultiValueMap<String, Object> data = new LinkedMultiValueMap<>();
        ByteArrayResource resource = new ByteArrayResource(file) {
            @Override
            public String getFilename() {
                return fileName;
            }
        };

        data.add("newAvatar", resource);
        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(data, requestHeaders);
        restTemplate.exchange("http://localhost:5050/user-avatar", HttpMethod.POST, requestEntity, Void.class);
    }

    @Override
    public boolean removeFile(String fileName) {
        Map<String, String> params = new HashMap<>();
        params.put("fileName", fileName);
        restTemplate.delete("http://localhost:5050/delete-user-avatar/{fileName}", params);
        return true;
    }
}
