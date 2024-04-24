package space.reviewly.filestorestub;

import ratpack.core.handling.Context;
import ratpack.core.handling.Handler;

public class HelloWorldHandler implements Handler {

    @Override
    public void handle(Context ctx) {
        ctx.render("Hello File storage STUB!");
    }
}
