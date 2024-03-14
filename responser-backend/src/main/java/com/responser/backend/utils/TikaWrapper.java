package com.responser.backend.utils;

import org.apache.tika.Tika;

public class TikaWrapper extends Tika {

    @Override
    public String detect(byte[] prefix) {
        String detectedMimeType = super.detect(prefix);
        String[] splitType = detectedMimeType.split("/");

        if (splitType.length < 2) {
            return null;
        }

        return splitType[1];
    }
}
