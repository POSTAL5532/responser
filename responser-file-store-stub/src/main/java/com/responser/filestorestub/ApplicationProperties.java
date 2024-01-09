package com.responser.filestorestub;

import java.util.Properties;

public class ApplicationProperties extends Properties {

    public ApplicationProperties() {
        super();
    }

    public String getFilesBasePath() {
        return this.getProperty("filesPath");
    }
}
