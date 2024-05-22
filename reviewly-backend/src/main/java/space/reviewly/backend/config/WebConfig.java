package space.reviewly.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;
import space.reviewly.backend.controller.filters.HashValidationFilter;

/**
 * Web config
 *
 * @author Shcherbachenya Igor
 */
@RequiredArgsConstructor
@Configuration
public class WebConfig {

    private final ApplicationProperties applicationProperties;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(applicationProperties.getAllowedOrigins());
        configuration.setAllowedMethods(Collections.singletonList(CorsConfiguration.ALL));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Collections.singletonList(CorsConfiguration.ALL));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public FilterRegistrationBean<HashValidationFilter> apiCallHashSignFilter(){
        FilterRegistrationBean<HashValidationFilter> registrationBean = new FilterRegistrationBean<>();

        registrationBean.setFilter(new HashValidationFilter());
        registrationBean.addUrlPatterns(ApplicationProperties.API_ROOT_PATH + "/*");

        return registrationBean;
    }
}
