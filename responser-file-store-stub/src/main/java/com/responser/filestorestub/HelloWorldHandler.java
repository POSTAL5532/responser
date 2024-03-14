package com.responser.filestorestub;

import static com.responser.filestorestub.Main.APP_PROPERTIES;

import ratpack.core.handling.Context;
import ratpack.core.handling.Handler;

public class HelloWorldHandler implements Handler {

    @Override
    public void handle(Context ctx) {
        ctx.render("Hello File storage STUB! Base file path is: " + APP_PROPERTIES.getFilesBasePath());
    }
}
