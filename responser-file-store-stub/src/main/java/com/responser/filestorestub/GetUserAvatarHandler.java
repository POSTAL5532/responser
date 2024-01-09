package com.responser.filestorestub;

import static com.responser.filestorestub.Main.APP_PROPERTIES;

import java.nio.file.Path;
import ratpack.core.handling.Context;
import ratpack.core.handling.Handler;

public class GetUserAvatarHandler implements Handler {

    @Override
    public void handle(Context ctx) throws Exception {
        String fileName = ctx.getPathTokens().get("fileName");

        if (fileName == null) {
            throw new NullPointerException("fileName parameter is empty!");
        }

        ctx.getResponse().sendFile(Path.of(APP_PROPERTIES.getFilesBasePath() + "\\users-avatars\\" + fileName));
    }
}
