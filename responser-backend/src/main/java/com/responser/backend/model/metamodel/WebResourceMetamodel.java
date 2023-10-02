package com.responser.backend.model.metamodel;

import com.responser.backend.model.WebResource_;
import org.apache.commons.lang3.StringUtils;

public class WebResourceMetamodel extends WebResource_ {

    public static final String ALIAS = "webResource";

    public static String getFromAlias(String alias) {
        if (StringUtils.isBlank(alias)) {
            throw new IllegalArgumentException("Alias must be specified");
        }

        return ALIAS.concat(".").concat(alias);
    }
}
