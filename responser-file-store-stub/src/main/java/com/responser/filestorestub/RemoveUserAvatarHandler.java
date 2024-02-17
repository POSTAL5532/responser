package com.responser.filestorestub;

import java.io.File;
import ratpack.core.handling.Context;
import ratpack.core.handling.Handler;

public class RemoveUserAvatarHandler implements Handler {

    @Override
    public void handle(Context context) throws Exception {
        String fileName = context.getPathTokens().get("fileName");

        if (fileName == null) {
            throw new NullPointerException("fileName parameter is empty!");
        }

        File fileToRemove = new File(String.format("%s\\%s", Main.APP_PROPERTIES.getUsersAvatarsPath(), fileName));
        fileToRemove.delete();

        context.getResponse().status(200).send();
    }
}
