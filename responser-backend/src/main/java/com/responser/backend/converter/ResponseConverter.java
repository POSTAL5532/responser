package com.responser.backend.converter;

import com.responser.backend.controller.responses.payload.CreateResponsePayload;
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

    public Response toResponse(CreateResponsePayload responsePayload, String userId) {
        Response response = new Response();
        response.setResourceId(responsePayload.getResourceId());
        response.setRating(responsePayload.getRating());
        response.setText(responsePayload.getText());

        User fakeUser = new User();
        fakeUser.setId(userId);

        response.setUser(fakeUser);

        return response;
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
