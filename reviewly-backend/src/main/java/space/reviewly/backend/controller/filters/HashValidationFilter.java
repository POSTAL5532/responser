package space.reviewly.backend.controller.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import lombok.extern.slf4j.Slf4j;
import org.apache.hc.client5.http.utils.Hex;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
public class HashValidationFilter extends OncePerRequestFilter {

    private static final String ALGORITHM = "SHA-256";
    private static final String REQUEST_TOKEN_HEADER_NAME = "X-Request-Id";
    private static final String REQUEST_DATE_HEADER_NAME = "X-Request-Current-Local-Date";
    private static final String REQUEST_SALT_HEADER_NAME = "X-Request-Config";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String hash = request.getHeader(REQUEST_TOKEN_HEADER_NAME);
        String date = request.getHeader(REQUEST_DATE_HEADER_NAME);
        String salt = request.getHeader(REQUEST_SALT_HEADER_NAME);

        String url = request.getRequestURL().toString();
        String message = url + date + salt;

        log.debug("Incoming request: hash = {}, date = {}, salt = {}, message = {}", hash, date, salt, message);

        if (hash == null || salt == null || date == null) {
            log.warn("API simple securing: Hash or salt is missing.");
            response.sendError(HttpServletResponse.SC_NOT_ACCEPTABLE, "Reviewly: Bad request IP");
            return;
        }


        if (!isHashValid(message, hash)) {
            log.warn("API simple securing: Hash is invalid.");
            response.sendError(HttpServletResponse.SC_NOT_ACCEPTABLE, "Reviewly: Bad request IP");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private boolean isHashValid(String message, String hash) {
        try {
            MessageDigest digest = MessageDigest.getInstance(ALGORITHM);
            byte[] hashBytes = digest.digest(message.getBytes(StandardCharsets.UTF_8));
            String calculatedHash = bytesToHex(hashBytes);

            log.debug("Calculated hash = {}", calculatedHash);

            return calculatedHash.equals(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Failed to validate hash", e);
        }
    }

    private String bytesToHex(byte[] bytes) {
        return Hex.encodeHexString(bytes);
    }
}
