package space.reviewly.backend.utils;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import javax.imageio.ImageIO;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
public class SiteIconUtil {

    private static final InputStream referenceImageStream;

    static {
        referenceImageStream = SiteIconUtil.class.getResourceAsStream("/default_site_icon_template.png");
        if (referenceImageStream == null) {
            throw new RuntimeException("SiteIconUtil: Could not find reference image resource.");
        }
    }

    public static byte[] downloadSiteIcon(String url) throws URISyntaxException {
        if (StringUtils.isBlank(url)) {
            return null;
        }

        String encodedUrl = UriComponentsBuilder.fromHttpUrl(url).encode().toUriString();
        URI uri = new URI("https://t2.gstatic.com/faviconV2");
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUri(uri)
            .queryParam("client", "SOCIAL")
            .queryParam("type", "FAVICON")
            .queryParam("fallback_opts", "TYPE,SIZE,URL")
            .queryParam("url", encodedUrl)
            .queryParam("size", "64");

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<byte[]> response;

        try{
            response = restTemplate.getForEntity(uriBuilder.toUriString(), byte[].class);
        } catch (Exception e){
            log.warn("Can not download site icon from {}", url, e);
            return null;
        }

        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        }

        return null;
    }

    public static boolean compareWithDefaultGoogleIcon(byte[] iconBytes) throws IOException {
        if (!ObjectUtils.isNotEmpty(iconBytes)) {
            throw new IllegalArgumentException("Comparable icon bytes is empty.");
        }

        InputStream downloadedImageStream = new ByteArrayInputStream(iconBytes);

        BufferedImage downloadedImage = ImageIO.read(downloadedImageStream);
        BufferedImage referenceImage = ImageIO.read(referenceImageStream);

        if (downloadedImage == null || referenceImage == null) {
            return false;
        }

        if (downloadedImage.getWidth() != referenceImage.getWidth() || downloadedImage.getHeight() != referenceImage.getHeight()) {
            return false;
        }

        for (int y = 0; y < downloadedImage.getHeight(); y++) {
            for (int x = 0; x < downloadedImage.getWidth(); x++) {
                if (downloadedImage.getRGB(x, y) != referenceImage.getRGB(x, y)) {
                    return false;
                }
            }
        }

        return true;
    }
}
