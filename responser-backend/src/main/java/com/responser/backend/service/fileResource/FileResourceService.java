package com.responser.backend.service.fileResource;

public interface FileResourceService {

    void uploadUserAvatar(byte[] file, String fileName);

    void removeUserAvatar(String fileName);

    void uploadSiteIcon(byte[] file, String fileName);
}
