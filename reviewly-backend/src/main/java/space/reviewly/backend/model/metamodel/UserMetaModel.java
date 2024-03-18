package space.reviewly.backend.model.metamodel;

import space.reviewly.backend.model.User_;
import org.apache.commons.lang3.StringUtils;

public class UserMetaModel extends User_ {

    public static final String ALIAS = "user";

    public static String getFromAlias(String alias) {
        if (StringUtils.isBlank(alias)) {
            throw new IllegalArgumentException("Alias must be specified");
        }

        return ALIAS.concat(".").concat(alias);
    }
}
