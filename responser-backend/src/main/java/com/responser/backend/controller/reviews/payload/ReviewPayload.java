package com.responser.backend.controller.reviews.payload;

import com.responser.backend.controller.reviewlike.payload.ReviewLikePayload;
import com.responser.backend.controller.user.payload.UserInfoPayload;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Collection;

/**
 * ReviewPayload
 *
 * @author SIE
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewPayload {

    private String id;

    private UserInfoPayload user;

    private String resourceId;

    private String reviewId;

    private Byte rating;

    private String text;

    private Collection<ReviewLikePayload> reviewLikes;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;
}
