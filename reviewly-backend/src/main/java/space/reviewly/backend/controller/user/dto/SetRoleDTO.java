package space.reviewly.backend.controller.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import space.reviewly.backend.model.user.RoleName;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SetRoleDTO {

    @NotNull
    private RoleName roleName;
}
