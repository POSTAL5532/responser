package space.reviewly.backend.controller.webresource.payload;

import space.reviewly.backend.model.webresource.ResourceType;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WebResourceDTO {

    private String id;

    private String url;

    private ResourceType resourceType;

    private String iconFileName;

    private WebResourceDTO parent;

    private Double rating;

    private Long reviewsCount;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;

}
