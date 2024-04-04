package space.reviewly.backend.config;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

public class JwtTokenAuthenticationConverter implements Converter<Jwt, JwtAuthenticationToken> {

    private static final String EMAIL_ATTRIBUTE_NAME = "sub";
    private static final String AUTHORITIES_ATTRIBUTE_NAME = "authorities";
    private static final String USER_ID_ATTRIBUTE_NAME = "userId";

    @Override
    public CustomOAuth2AuthenticatedPrincipal convert(Jwt source) {
        Map<String, Object> attributes = source.getClaims();

        Collection<? extends GrantedAuthority> authorities = AuthorityUtils.NO_AUTHORITIES;

        if (attributes.containsKey("authorities")) {
            authorities = ((List<String>) attributes.get(AUTHORITIES_ATTRIBUTE_NAME)).stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toUnmodifiableSet());
        }

        if (!attributes.containsKey(EMAIL_ATTRIBUTE_NAME) || StringUtils.isBlank((String) attributes.get(EMAIL_ATTRIBUTE_NAME))) {
            throw new RuntimeException("Empty JWT attribute: " + EMAIL_ATTRIBUTE_NAME);
        }

        String email = (String) attributes.get(EMAIL_ATTRIBUTE_NAME);

        if (!attributes.containsKey(USER_ID_ATTRIBUTE_NAME) || StringUtils.isBlank((String) attributes.get(USER_ID_ATTRIBUTE_NAME))) {
            throw new RuntimeException("Empty JWT attribute: " + USER_ID_ATTRIBUTE_NAME);
        }

        String id = (String) attributes.get(USER_ID_ATTRIBUTE_NAME);

        return new CustomOAuth2AuthenticatedPrincipal(source, id, email, authorities, attributes);
    }
}
