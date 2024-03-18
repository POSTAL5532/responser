package space.reviewly.backend.model.metamodel;

import space.reviewly.backend.model.Review_;
import org.apache.commons.lang3.StringUtils;

public class ReviewMetaModel extends Review_ {

    public static final String ALIAS = "review";

    public static String getFromAlias(String alias) {
        if (StringUtils.isBlank(alias)) {
            throw new IllegalArgumentException("Alias must be specified");
        }

        return ALIAS.concat(".").concat(alias);
    }
}
