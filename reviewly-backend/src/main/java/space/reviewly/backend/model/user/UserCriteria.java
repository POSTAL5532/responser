package space.reviewly.backend.model.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserCriteria {

    private String id;

    private String fullName;

    private RegisteredBy registeredBy;

    public boolean hasId() {
        return StringUtils.isNotBlank(id);
    }

    public boolean hasFullName() {
        return StringUtils.isNotBlank(fullName);
    }

    public boolean hasRegisteredBy() {
        return registeredBy != null;
    }
}
