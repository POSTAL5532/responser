package com.responser.backend.service.fileResource;

import java.io.File;
import java.io.IOException;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;

@Service
public class FileResourceServiceImpl implements FileResourceService {

    public static final String FILES_PATH = "C:\\Users\\HP\\IdeaProjects\\Responser\\file_store";

    @Override
    public void uploadFile(byte[] file, String fileName) throws IOException {
        File newFile = new File(String.format("%s\\%s", FILES_PATH, fileName));
        FileUtils.writeByteArrayToFile(newFile, file);
    }

    @Override
    public boolean removeFile(String fileName) {
        File fileToRemove = new File(String.format("%s\\%s", FILES_PATH, fileName));
        return fileToRemove.delete();
    }
}
