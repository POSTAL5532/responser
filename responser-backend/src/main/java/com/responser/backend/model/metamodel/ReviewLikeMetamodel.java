package com.responser.backend.model.metamodel;

import com.responser.backend.model.ReviewLike_;
import org.apache.commons.lang3.StringUtils;

public class ReviewLikeMetamodel extends ReviewLike_ {

    public static final String ALIAS = "reviewLike";

    public static String getFromAlias(String alias) {
        if (StringUtils.isBlank(alias)) {
            throw new IllegalArgumentException("Alias must be specified");
        }

        return ALIAS.concat(".").concat(alias);
    }
}
