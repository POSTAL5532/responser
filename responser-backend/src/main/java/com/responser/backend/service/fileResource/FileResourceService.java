package com.responser.backend.service.fileResource;

public interface FileResourceService {

    void uploadFile(byte[] file, String fileName);

    boolean removeFile(String fileName);
}
