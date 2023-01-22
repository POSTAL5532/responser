package com.responser.backend.utils;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.net.MalformedURLException;
import java.net.URL;

/**
 * Utilities class for URLs processing.
 *
 * @author Shcherbachenya Igor
 */
@Slf4j
public class UrlUtils {

    public static URL convertToURL(String rawUrl) {
        try {
            return new URL(rawUrl);
        } catch (MalformedURLException e) {
            log.error("Invalid URL string.");
            throw new IllegalArgumentException("Invalid URL string.");
        }
    }

    /**
     * Format raw url string to right format.
     *
     * @param url raw url string
     * @return prepared url
     */
    public static String prepareUrl(String url) {
        String formattedUrl = StringUtils.trim(url);
        formattedUrl = StringUtils.removeEnd(formattedUrl, "/");
        return formattedUrl;
    }

    /**
     * Returns is url has a ssl (https).
     *
     * @param url url object
     * @return boolean flag
     */
    public static boolean haveSsl(URL url) {
        return url.getProtocol().equals("https");
    }
}
