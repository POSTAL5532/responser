package space.reviewly.backend.model.webresource;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.Set;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import space.reviewly.backend.model.AbstractEntity;
import space.reviewly.backend.model.review.Review;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "web_resource")
public class WebResource extends AbstractEntity {

    private String url;

    @Column(name="parent_id")
    private String parentId;

    @Enumerated(EnumType.STRING)
    @Column(name = "resource_type")
    private ResourceType resourceType;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="parent_id", insertable = false, updatable = false)
    private WebResource parent;

    @Column(name="icon_file_name")
    private String iconFileName;

    @OneToMany(mappedBy = "webResource", fetch = FetchType.LAZY)
    private Set<Review> reviews;
}
