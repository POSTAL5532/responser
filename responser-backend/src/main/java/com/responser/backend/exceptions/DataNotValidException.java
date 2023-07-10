package com.responser.backend.exceptions;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DataNotValidException extends RuntimeException {

    private Map<String, List<String>> fieldsErrors;

    public DataNotValidException(String message, Map<String, List<String>> fieldsErrors) {
        super(message);
        this.fieldsErrors = fieldsErrors;
    }

    public DataNotValidException(String message) {
        super(message);
        this.fieldsErrors = new HashMap<>();
    }
}
