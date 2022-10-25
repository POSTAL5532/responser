package com.responser.backend.utils;

import org.apache.commons.lang3.StringUtils;

import java.net.MalformedURLException;
import java.net.URL;

/**
 * UrlUtils
 *
 * @author SIE
 */
public class UrlUtils {

    public static URL convertToURL(String rawUrl) {
        try {
            return new URL(rawUrl);
        } catch (MalformedURLException e) {
            throw new IllegalArgumentException("Invalid URL string.");
        }
    }

    public static String prepareUrl(String url) {
        String formattedUrl = StringUtils.trim(url);
        formattedUrl = StringUtils.removeEnd(formattedUrl, "/");
        return formattedUrl;
    }
}
