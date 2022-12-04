package com.responser.backend.controller.responses.payload;

import com.responser.backend.controller.user.payload.UserInfoPayload;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * ResponsePayload
 *
 * @author SIE
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponsePayload {

    private String id;

    private UserInfoPayload user;

    private String resourceId;

    private String responseId;

    private Byte rating;

    private String text;

    private LocalDateTime creationDate;

    private LocalDateTime updateDate;
}
