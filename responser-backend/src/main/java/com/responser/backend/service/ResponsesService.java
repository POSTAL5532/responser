package com.responser.backend.service;

import com.responser.backend.model.Response;
import com.responser.backend.model.User;
import com.responser.backend.repository.ResponseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * ResponsesService
 *
 * @author SIE
 */
@AllArgsConstructor
@Service
@Transactional(readOnly = true)
public class ResponsesService {

    private final ResponseRepository responseRepository;

    private final UserService userService;

    public List<Response> getAllForResource(String resourceId) {
        return responseRepository.findAllByResourceId(resourceId);
    }

    @Transactional
    public Response createResponse(Response newResponse) {
        User referenceUser = userService.getUser(newResponse.getUser().getId());
        newResponse.setUser(referenceUser);
        return responseRepository.save(newResponse);
    }
}
