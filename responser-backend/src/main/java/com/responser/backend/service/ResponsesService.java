package com.responser.backend.service;

import com.responser.backend.model.Response;
import com.responser.backend.model.User;
import com.responser.backend.repository.ResponseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.MessageFormat;
import java.util.List;
import java.util.NoSuchElementException;

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

    public Response getResponseByIdAndUser(String responseId, String userId) {
        return responseRepository.findByIdAndUserId(responseId, userId).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format(
                        "Response with id ''{0}'' and user id ''{1}'' doesn't exist",
                        responseId,
                        userId
                ))
        );
    }

    public List<Response> getAllForResource(String resourceId) {
        return responseRepository.findAllByResourceId(resourceId);
    }

    @Transactional
    public Response createResponse(Response newResponse) {
        User referenceUser = userService.getUser(newResponse.getUser().getId());
        newResponse.setUser(referenceUser);
        return responseRepository.save(newResponse);
    }

    @Transactional
    public Response updateResponse(Response response) {
        Response oldResponse = this.getResponseByIdAndUser(response.getId(), response.getUser().getId());
        oldResponse.setText(response.getText());
        oldResponse.setRating(response.getRating());

        return responseRepository.save(oldResponse);
    }
}
