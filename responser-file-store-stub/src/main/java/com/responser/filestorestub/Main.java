package com.responser.filestorestub;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import ratpack.core.server.RatpackServer;

public class Main {

    public static ApplicationProperties APP_PROPERTIES;

    public static void main(String[] args) throws Exception {
        APP_PROPERTIES = readProperties();
        printProperties(APP_PROPERTIES);

        RatpackServer.start(server -> server
            .handlers(chain -> chain
                .get(new HelloWorldHandler())
                .get("user-avatar/:fileName", new GetUserAvatarHandler())
                .get("site-icon/:fileName", new GetSiteIconHandler())
            )
        );
    }

    private static void printProperties(Properties properties) {
        properties.forEach((key, value) -> System.out.println(key + "=" + value));
    }

    private static ApplicationProperties readProperties() throws IOException {
        InputStream inputStream = null;
        ApplicationProperties properties;

        try {
            properties = new ApplicationProperties();
            ClassLoader loader = Thread.currentThread().getContextClassLoader();
            inputStream = loader.getResourceAsStream("responser-file-store-stub.properties");
            properties.load(inputStream);
        } finally {
            if (inputStream != null) {
                inputStream.close();
            }
        }

        return properties;
    }
}