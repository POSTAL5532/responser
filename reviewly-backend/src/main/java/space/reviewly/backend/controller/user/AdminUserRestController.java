package space.reviewly.backend.controller.user;

import static space.reviewly.backend.config.ApplicationProperties.ADMIN_API_ROOT_PATH;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import space.reviewly.backend.config.CustomOAuth2AuthenticatedPrincipal;
import space.reviewly.backend.controller.payload.PageableResponse;
import space.reviewly.backend.controller.payload.Pagination;
import space.reviewly.backend.controller.user.dto.UserAdminDTO;
import space.reviewly.backend.converter.PaginationConverter;
import space.reviewly.backend.converter.UserConverter;
import space.reviewly.backend.model.AbstractEntity;
import space.reviewly.backend.model.user.User;
import space.reviewly.backend.model.user.UserSpamIndicator;
import space.reviewly.backend.service.user.UserService;
import space.reviewly.backend.service.user.UserSpamIndicatorService;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(ADMIN_API_ROOT_PATH + "/users")
public class AdminUserRestController {

    private final UserService userService;

    private final UserSpamIndicatorService userSpamIndicatorService;

    private final UserConverter userConverter;

    private final PaginationConverter paginationConverter;

    @PreAuthorize("hasAuthority('SELECT_ANY_USER')")
    @GetMapping
    public ResponseEntity<PageableResponse<UserAdminDTO>> getUsers(@Valid @NotNull Pagination pagination) {
        Page<User> usersPage = userService.getFullUsers(paginationConverter.toPageable(pagination));

        PageableResponse<UserAdminDTO> userAdminDTOPageableResponse = userConverter.toPageableUserAdminDTO(usersPage);

        Map<String, UserSpamIndicator> userSpamIndicators = userSpamIndicatorService.getUserSpamIndicatorsByUserIds(
            usersPage.get().map(AbstractEntity::getId).toList()
        ).stream().collect(Collectors.toMap(UserSpamIndicator::getUserId, Function.identity()));

        userAdminDTOPageableResponse.getData().forEach(userAdminDTO -> userAdminDTO.setUserSpamIndicator(userSpamIndicators.get(userAdminDTO.getId())));

        return ResponseEntity.ok(userConverter.toPageableUserAdminDTO(usersPage));
    }

    @PreAuthorize("hasAuthority('SELECT_ANY_USER')")
    @GetMapping("/current")
    public ResponseEntity<UserAdminDTO> getCurrentUser(CustomOAuth2AuthenticatedPrincipal principal) {
        String userId = principal.getUserId();

        log.debug("Get current {} admin user.", userId);

        User user = userService.getFullUser(userId);
        UserAdminDTO userPayload = userConverter.toUserAdminDTO(user);

        try {
            userPayload.setUserSpamIndicator(userSpamIndicatorService.getByUserId(userId));
        } catch (NoSuchElementException e) {
            userPayload.setUserSpamIndicator(null);
        }

        return ResponseEntity.ok(userPayload);
    }
}
