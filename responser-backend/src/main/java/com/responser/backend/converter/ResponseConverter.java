package com.responser.backend.converter;

import com.responser.backend.controller.responses.payload.ResponseDataPayload;
import com.responser.backend.controller.responses.payload.ResponsePayload;
import com.responser.backend.model.Response;
import com.responser.backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * ResponseConverter
 *
 * @author SIE
 */
@RequiredArgsConstructor
@Service
public class ResponseConverter {

    public Response toResponse(String responseId, ResponseDataPayload responsePayload, String userId) {
        User fakeUser = new User();
        fakeUser.setId(userId);

        Response response = new Response();
        response.setId(responseId);
        response.setResourceId(responsePayload.getResourceId());
        response.setRating(responsePayload.getRating());
        response.setText(responsePayload.getText());
        response.setUser(fakeUser);

        return response;
    }

    public Response toResponse(ResponseDataPayload responsePayload, String userId) {
        return toResponse(null, responsePayload, userId);
    }

    public ResponsePayload toResponsePayload(Response response) {
        return ResponsePayload.builder()
                .id(response.getId())
                .resourceId(response.getResourceId())
                .user(response.getUser())
                .text(response.getText())
                .rating(response.getRating())
                .creationDate(response.getCreationDate())
                .updateDate(response.getUpdateDate())
                .build();
    }

    public List<ResponsePayload> toResponsePayloadList(List<Response> responses) {
        return responses.stream().map(this::toResponsePayload).collect(Collectors.toList());
    }
}
