package space.reviewly.backend.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import space.reviewly.backend.exceptions.DataNotValidException;
import space.reviewly.backend.model.ResourceType;
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

    public static final String HTTP_SEPARATOR = "/";

    public final static Pattern WEB_URL_PATTERN = Pattern.compile("(http[s]?://)?(www\\.)?\\S+\\.\\S+", Pattern.CASE_INSENSITIVE);

    public static boolean isValidUrl(String rawUrl) {
        try {
            new URL(rawUrl);
        } catch (MalformedURLException e) {
            return false;
        }

        return true;
    }

    public static void checkUrl(String rawUrl) {
        if (!isValidUrl(rawUrl)) {
            throw new IllegalArgumentException("Invalid URL string.");
        }
    }

    public static String prepareSiteUrl(String rawUrl) {
        checkUrl(rawUrl);

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

    public static String preparePageUrl(String rawUrl) {
        checkUrl(rawUrl);

        String formattedUrl = StringUtils.trim(rawUrl);
        formattedUrl = StringUtils.removeEnd(formattedUrl.split("#")[0], HTTP_SEPARATOR);
        return formattedUrl;
    }

    public static String prepareUrlByResourceType(String rawUrl, ResourceType resourceType) {
        return switch (resourceType) {
            case SITE -> prepareSiteUrl(rawUrl);
            case PAGE -> preparePageUrl(rawUrl);
        };
    }

    public static String getHost(String rawUrl) {
        URL url;

        try {
            url = new URL(rawUrl);
        } catch (MalformedURLException e) {
            throw new DataNotValidException("Invalid url");
        }

        return url.getHost();
    }

    public static String replaceAllWebLinks(String text) {
        Matcher matcher = WEB_URL_PATTERN.matcher(text);
        return matcher.replaceAll("***");
    }
}
