package com.responser.backend.controller.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ApiResponse
 *
 * @author SIE
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApiResponse<T> {

    private ApiResponseStatus status;

    private T data;
}
