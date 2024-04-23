package space.reviewly.authserver.model.email;

import java.util.Map;
import lombok.Data;

@Data
public class EmailContext {

    private String from;

    private String to;

    private String subject;

    private EmailTemplate template;

    private Map<String, Object> properties;
}
