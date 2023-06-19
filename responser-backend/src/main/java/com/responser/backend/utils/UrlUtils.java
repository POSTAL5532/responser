package com.responser.backend.utils;

import com.responser.backend.model.ResourceType;
import java.net.URI;
import java.net.URISyntaxException;
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

    public static final String SSL_FLAG = "https";

    public static final String HTTP_SEPARATOR = "/";

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
        formattedUrl = StringUtils.removeEnd(formattedUrl.split("#")[0], HTTP_SEPARATOR);
        return formattedUrl;
    }

    /**
     * Returns is url has a ssl (https).
     *
     * @param url url object
     * @return boolean flag
     */
    public static boolean haveSsl(URL url) {
        return url.getProtocol().equals(SSL_FLAG);
    }

    public static String prepareSiteUrl(String rawUrl) {
        String formattedUrl = StringUtils.trim(rawUrl);
        URI uri;

        try {
            uri = new URI(formattedUrl);
        } catch (URISyntaxException e) {
            log.error("Invalid URL string.");
            throw new IllegalArgumentException("Invalid URL string.");
        }

        return StringUtils.removeEnd(uri.resolve(HTTP_SEPARATOR).toString(), HTTP_SEPARATOR);
    }

    public static String preparePageUrl(String url) {
        String formattedUrl = StringUtils.trim(url);
        formattedUrl = StringUtils.removeEnd(formattedUrl.split("#")[0], HTTP_SEPARATOR);
        return formattedUrl;
    }

    public static String prepareUrlByResourceType(String rawUrl, ResourceType resourceType) {
        return switch (resourceType) {
            case SITE -> prepareSiteUrl(rawUrl);
            case PAGE -> preparePageUrl(rawUrl);
        };
    }
}
