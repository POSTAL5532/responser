package space.reviewly.filestorestub;

import java.io.File;
import org.apache.commons.io.FileUtils;
import ratpack.core.form.Form;
import ratpack.core.form.UploadedFile;
import ratpack.core.handling.Context;
import ratpack.core.handling.Handler;
import ratpack.exec.Promise;

public class SetSiteIconHandler implements Handler {

    @Override
    public void handle(Context context) {
        Promise<Form> form = context.parse(Form.class);

        form.then(f -> {
            UploadedFile newAvatar = f.file("newSiteIcon");
            String fileName = newAvatar.getFileName();

            File newFile = new File(String.format("%s/%s", Main.APP_PROPERTIES.getSitesIconsPath(), fileName));
            FileUtils.writeByteArrayToFile(newFile, newAvatar.getBytes());

            context.getResponse().status(200).send();
        });
    }
}
