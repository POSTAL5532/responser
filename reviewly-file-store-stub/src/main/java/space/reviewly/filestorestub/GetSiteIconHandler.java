package space.reviewly.filestorestub;

import java.nio.file.Path;
import ratpack.core.handling.Context;
import ratpack.core.handling.Handler;

public class GetSiteIconHandler implements Handler {

    @Override
    public void handle(Context ctx) {
        String fileName = ctx.getPathTokens().get("fileName");

        if (fileName == null) {
            throw new NullPointerException("fileName parameter is empty!");
        }

        ctx.getResponse().sendFile(Path.of(Main.APP_PROPERTIES.getSitesIconsPath() + "/" + fileName));
    }
}
