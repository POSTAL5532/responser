package com.responser.filestorestub;

import java.io.File;
import org.apache.commons.io.FileUtils;
import ratpack.core.form.Form;
import ratpack.core.form.UploadedFile;
import ratpack.core.handling.Context;
import ratpack.core.handling.Handler;
import ratpack.exec.Promise;

public class SetUserAvatarHandler implements Handler {

    @Override
    public void handle(Context context) {
        Promise<Form> form = context.parse(Form.class);

        form.then(f -> {

            UploadedFile newAvatar = f.file("newAvatar");
            String fileName = newAvatar.getFileName();

            File newFile = new File(String.format("%s/%s", Main.APP_PROPERTIES.getUsersAvatarsPath(), fileName));
            FileUtils.writeByteArrayToFile(newFile, newAvatar.getBytes());

            context.getResponse().status(200).send();
        });
    }
}
