package space.reviewly.backend.converter;

import space.reviewly.backend.controller.payload.Pagination;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * {@link Pagination}, {@link Pageable} converter.
 *
 * @author Shcherbachenya Igor
 */
@Service
public class PaginationConverter {

    public Pageable toPageable(Pagination pagination) {
        return PageRequest.of(pagination.getPageNumber(), pagination.getPageSize());
    }
}
