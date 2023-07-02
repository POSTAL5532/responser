package com.responser.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class ResponserBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ResponserBackendApplication.class, args);
    }
}
