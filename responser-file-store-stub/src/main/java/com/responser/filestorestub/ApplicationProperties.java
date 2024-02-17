package com.responser.filestorestub;

import java.util.Properties;

public class ApplicationProperties extends Properties {

    public ApplicationProperties() {
        super();
    }

    public String getFilesBasePath() {
        return this.getProperty("filesPath");
    }

    public String getSitesIconsPath() {
        return this.getProperty("sitesIconsPath");
    }

    public String getUsersAvatarsPath() {
        return this.getProperty("usersAvatarsPath");
    }
}
