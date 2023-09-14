package com.responser.backend.service.fileResource;

import java.io.IOException;

public interface FileResourceService {

    void uploadFile(byte[] file, String fileName) throws IOException;

    boolean removeFile(String fileName);
}
