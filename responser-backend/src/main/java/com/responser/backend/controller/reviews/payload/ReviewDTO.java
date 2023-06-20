package com.responser.backend.controller.reviews.payload;

import com.responser.backend.controller.reviewlike.payload.ReviewLikeDTO;
import com.responser.backend.controller.user.payload.UserInfoPayload;
import com.responser.backend.controller.webresource.payload.WebResourceDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Collection;

/**
 * Review like DTO payload.
 *
 * @author Shcherbachenya Igor
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDTO {

    private String id;

    private UserInfoPayload user;

    private String resourceId;

    private String reviewId;

    private Byte rating;

    private String text;

    private Collection<ReviewLikeDTO> reviewLikes;

    private WebResourceDTO webResource;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;
}
