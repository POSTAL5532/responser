package space.reviewly.backend.utils;

import org.apache.tika.Tika;

public class TikaWrapper extends Tika {

    public String detectExtension(byte[] prefix) {
        String detectedMimeType = this.detect(prefix);
        String[] splitType = detectedMimeType.split("/");

        if (splitType.length < 2) {
            return null;
        }

        return splitType[1];
    }
}
