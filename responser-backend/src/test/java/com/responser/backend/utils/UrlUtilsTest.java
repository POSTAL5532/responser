package com.responser.backend.utils;

import static org.junit.jupiter.api.Assertions.*;

import java.net.URL;
import org.junit.jupiter.api.Test;

class UrlUtilsTest {

    @Test
    public void convertToURL() {
        URL url = UrlUtils.convertToURL("https://test.com");
        assertEquals("test.com", url.getHost());
    }

    @Test
    public void prepareUrl() {
        String url = UrlUtils.prepareUrl("https://test.com/");
        assertEquals("https://test.com", url);

        url = UrlUtils.prepareUrl("https://test.com/qwert#qwe#rty");
        assertEquals("https://test.com/qwert", url);
    }
}