package space.reviewly.filestorestub;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;
import ratpack.core.server.RatpackServer;

public class Main {

    public static ApplicationProperties APP_PROPERTIES;

    public static void main(String[] args) throws Exception {
        if (args.length == 0) {
            throw new IllegalArgumentException("You must specify properties file path in arguments.");
        }

        System.out.println("Run Reviewly STUB File storage with properties in: " + args[0] + "\n");

        APP_PROPERTIES = readProperties(args[0]);
        printProperties(APP_PROPERTIES);

        RatpackServer.start(server -> server
            .handlers(chain -> chain
                .get(new HelloWorldHandler())

                .get("user-avatar/:fileName", new GetUserAvatarHandler())
                .post("user-avatar", new SetUserAvatarHandler())
                .delete("delete-user-avatar/:fileName", new RemoveUserAvatarHandler())

                .get("site-icon/:fileName", new GetSiteIconHandler())
                .post("site-icon", new SetSiteIconHandler())
            )
        );
    }

    private static void printProperties(Properties properties) {
        properties.forEach((key, value) -> System.out.println(key + "=" + value));
    }

    private static ApplicationProperties readProperties(String propertiesFilePath) throws IOException {
        ApplicationProperties properties;

        try (FileInputStream fis = new FileInputStream(propertiesFilePath);
            BufferedInputStream bis = new BufferedInputStream(fis)) {
            properties = new ApplicationProperties();
            properties.load(bis);
        }

        return properties;
    }
}