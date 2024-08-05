package space.reviewly.backend.controller.webresource.payload;

import space.reviewly.backend.model.webresource.ResourceType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewWebResourceDTO {

    @NotBlank(message = "URL must be specified")
    @Size(min = 10, message = "URL must be from 5 characters")
    private String url;

    @NotNull(message = "Resource type must be specified")
    private ResourceType resourceType;

    private String parentId;
}
