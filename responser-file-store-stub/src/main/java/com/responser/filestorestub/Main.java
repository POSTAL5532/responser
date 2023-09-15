package com.responser.filestorestub;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.util.Properties;
import ratpack.core.server.RatpackServer;

public class Main {

    public static void main(String[] args) throws Exception {
        Properties properties = readProperties();
        printProperties(properties);

        RatpackServer.start(server -> server
            .handlers(chain -> chain
                .get(ctx -> ctx.render("Stub responser file storage is active!"))
                .get(":fileName", ctx -> {
                    String fileName = ctx.getPathTokens().get("fileName");

                    if (fileName == null) {
                        throw new NullPointerException("fileName parameter is empty!");
                    }

                    if (fileName.equals("favicon.ico")) {
                        ctx.render("Hello World!");
                        return;
                    }

                    ctx.getResponse().sendFile(Path.of(properties.getProperty("filesPath") + "\\" + ctx.getPathTokens().get("fileName")));
                })
            )
        );
    }

    private static void printProperties(Properties properties) {
        properties.forEach((key, value) -> System.out.println(key + "=" + value));
    }

    private static Properties readProperties() throws IOException {
        InputStream inputStream = null;
        Properties properties;

        try {
            properties = new Properties();
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