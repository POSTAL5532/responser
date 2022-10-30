package com.responser.backend.converter;

import com.responser.backend.controller.resource.payload.CreateResourcePayload;
import com.responser.backend.controller.resource.payload.ResourcePayload;
import com.responser.backend.model.Domain;
import com.responser.backend.model.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * ResourceConverter
 *
 * @author SIE
 */
@RequiredArgsConstructor
@Service
public class ResourceConverter {

    private final DomainConverter domainConverter;

    public Resource toResource(CreateResourcePayload createResourcePayload) {
        Resource resource = new Resource();
        resource.setUrl(createResourcePayload.getUrl());
        resource.setName(createResourcePayload.getName());
        resource.setDescription(createResourcePayload.getDescription());

        //TODO: review of this workaround!
        Domain proxyDomain = new Domain();
        proxyDomain.setId(createResourcePayload.getDomainId());

        resource.setDomain(proxyDomain);

        return resource;
    }

    public ResourcePayload toResourcePayload(Resource resource) {
        return ResourcePayload.builder()
                .id(resource.getId())
                .url(resource.getUrl())
                .name(resource.getName())
                .description(resource.getDescription())
                .domain(domainConverter.toDomainPayload(resource.getDomain()))
                .build();
    }
}
