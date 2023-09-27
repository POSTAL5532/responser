package com.responser.backend.controller.payload;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * Data pagination criteria.
 */
@Data
public class Pagination {

    @NotNull
    @Min(0)
    @Max(Integer.MAX_VALUE)
    private Integer pageNumber;

    @NotNull
    @Min(0)
    @Max(20)
    private Integer pageSize;
}
