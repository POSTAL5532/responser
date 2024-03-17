package com.responser.backend.service.fileResource;

import com.responser.backend.config.ApplicationProperties;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class StubFileResourceServiceImpl implements FileResourceService {

    private final RestTemplate restTemplate = new RestTemplate();

    private final ApplicationProperties applicationProperties;

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
        uploadFile(applicationProperties.getFileStorageUrlUsersAvatars(), "newAvatar", file, fileName);
    }

    @Override
    public void removeUserAvatar(String fileName) {
        removeFile(applicationProperties.getFileStorageUrl() + "/delete-user-avatar", fileName);
    }

    @Override
    public void uploadSiteIcon(byte[] file, String fileName) {
        uploadFile(applicationProperties.getFileStorageUrlSitesIcons(), "newSiteIcon", file, fileName);
    }
}
