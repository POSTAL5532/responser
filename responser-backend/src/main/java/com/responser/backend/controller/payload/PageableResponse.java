package com.responser.backend.controller.payload;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PageableResponse<T> {

    private Long totalElements;

    private Integer totalPages;

    private Integer currentPageNumber;

    private Integer currentPageElements;

    private Boolean isLast;

    private List<T> data;
}
