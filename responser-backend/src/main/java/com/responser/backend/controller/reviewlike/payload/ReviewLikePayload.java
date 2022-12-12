package com.responser.backend.controller.reviewlike.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewLikePayload {

    private String id;

    private String userId;

    private String reviewId;

    private Boolean positive;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;
}
