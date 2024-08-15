package space.reviewly.backend.controller.user;

import static space.reviewly.backend.config.ApplicationProperties.ADMIN_API_ROOT_PATH;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import space.reviewly.backend.config.CustomOAuth2AuthenticatedPrincipal;
import space.reviewly.backend.controller.RestApiController;
import space.reviewly.backend.controller.payload.PageableResponse;
import space.reviewly.backend.controller.payload.Pagination;
import space.reviewly.backend.controller.user.dto.CreateFakeUserProfileDTO;
import space.reviewly.backend.controller.user.dto.SetRoleDTO;
import space.reviewly.backend.controller.user.dto.UserAdminDTO;
import space.reviewly.backend.converter.PaginationConverter;
import space.reviewly.backend.converter.UserConverter;
import space.reviewly.backend.model.AbstractEntity;
import space.reviewly.backend.model.user.User;
import space.reviewly.backend.model.user.UserCriteria;
import space.reviewly.backend.model.user.UserSpamIndicator;
import space.reviewly.backend.service.user.UserService;
import space.reviewly.backend.service.user.UserSpamIndicatorService;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(ADMIN_API_ROOT_PATH + "/users")
public class AdminUserRestController extends RestApiController {

    private final UserService userService;

    private final UserSpamIndicatorService userSpamIndicatorService;

    private final UserConverter userConverter;

    private final PaginationConverter paginationConverter;

    @PreAuthorize("hasAuthority('SELECT_ANY_USER')")
    @GetMapping
    public ResponseEntity<PageableResponse<UserAdminDTO>> getUsers(
        @Valid @NotNull UserCriteria criteria,
        @Valid @NotNull Pagination pagination
    ) {

        Page<User> usersPage = userService.getFullUsers(criteria, paginationConverter.toPageable(pagination));
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
        return ResponseEntity.ok(getUserAdminDTO(userId));
    }

    @PreAuthorize("hasAuthority('CHANGE_ANY_USER')")
    @PutMapping("/set-role/{userId}")
    public ResponseEntity<UserAdminDTO> setRole(@Valid @NotBlank @PathVariable String userId, @Valid @RequestBody SetRoleDTO setRoleDTO) {
        log.debug("Set {} role for user {}.", setRoleDTO.getRoleName(), userId);
        userService.setRole(userId, setRoleDTO.getRoleName());

        return ResponseEntity.ok(getUserAdminDTO(userId));
    }

    @PreAuthorize("hasAuthority('CREATE_FAKE_USERS')")
    @PostMapping("/create-fake")
    public ResponseEntity<String> createFakeUser(@Valid @RequestBody CreateFakeUserProfileDTO newUser) {
        log.debug("Register new user.");
        User registeredUser = userService.registerFakeUser(userConverter.toUser(newUser));
        return ResponseEntity.ok(registeredUser.getId());
    }

    private UserAdminDTO getUserAdminDTO(String userId) {
        User user = userService.getFullUser(userId);
        UserAdminDTO userPayload = userConverter.toUserAdminDTO(user);

        try {
            userPayload.setUserSpamIndicator(userSpamIndicatorService.getByUserId(userId));
        } catch (NoSuchElementException e) {
            userPayload.setUserSpamIndicator(null);
        }

        return userPayload;
    }
}
