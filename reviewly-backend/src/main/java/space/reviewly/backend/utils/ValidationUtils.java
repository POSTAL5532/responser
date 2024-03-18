package space.reviewly.backend.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ValidationUtils {

    public static final String PASSWORD_VALIDITY_REGEXP = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$";

    public static Map<String, List<String>> createSingletonFieldErrorMap(String field, String... errors) {
        List<String> errorsList = new ArrayList<>(Arrays.asList(errors));
        Map<String, List<String>> errosMap = new HashMap<>();
        errosMap.put(field, errorsList);

        return errosMap;
    }
}
