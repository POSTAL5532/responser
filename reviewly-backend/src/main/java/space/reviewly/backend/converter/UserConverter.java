package space.reviewly.backend.converter;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import space.reviewly.backend.controller.payload.PageableResponse;
import space.reviewly.backend.controller.user.dto.CreateUserProfileDTO;
import space.reviewly.backend.controller.user.dto.RoleDTO;
import space.reviewly.backend.controller.user.dto.UpdateUserDTO;
import space.reviewly.backend.controller.user.dto.UserAdminDTO;
import space.reviewly.backend.controller.user.dto.UserBasicDTO;
import space.reviewly.backend.controller.user.dto.UserDTO;
import space.reviewly.backend.model.user.RegisteredBy;
import space.reviewly.backend.model.user.Role;
import space.reviewly.backend.model.user.User;
import org.springframework.stereotype.Service;
import space.reviewly.backend.service.user.UserService;

/**
 * UserConverter
 *
 * @author Shcherbachenya Igor
 */
@Service
public class UserConverter {

    public User toUser(CreateUserProfileDTO newUserPayload) {
        User user = new User();
        user.setEmail(newUserPayload.getEmail());
        user.setPassword(newUserPayload.getPassword());
        user.setFullName(newUserPayload.getFullName());

        return user;
    }

    public User toUser(UpdateUserDTO updateUser) {
        User user = new User();
        user.setEmail(updateUser.getEmail());
        user.setFullName(updateUser.getFullName());

        return user;
    }

    public UserBasicDTO toUserBasicDTO(User user) {
        return UserBasicDTO.builder()
            .id(user.getId())
            .fullName(user.getFullName())
            .avatarFileName(user.getAvatarFileName())
            .build();
    }

    public UserDTO toUserDTO(User user) {
        UserDTO.UserDTOBuilder userDTOBuilder = UserDTO.builder()
            .id(user.getId())
            .fullName(user.getFullName())
            .avatarFileName(user.getAvatarFileName())
            .email(user.getEmail())
            .emailConfirmed(user.getEmailConfirmed())
            .registeredBy(user.getRegisteredBy())
            .isUsePasswordStub(
                user.getPassword().equals(UserService.SOCIAL_SIGNUP_USER_PASSWORD_STUB) && user.getRegisteredBy() != RegisteredBy.NATIVE
            )
            .creationDate(user.getCreationDate())
            .updateDate(user.getUpdateDate());

        Optional<Role> roleOptional = user.getRoles().stream().findFirst();

        if (roleOptional.isPresent()) {
            Role role = roleOptional.get();
            userDTOBuilder.isBlocked(role.getName().equals("USER_BLOCKED"));
        }

        return userDTOBuilder.build();
    }

    public UserAdminDTO toUserAdminDTO(User user) {
        UserAdminDTO.UserAdminDTOBuilder userDTOBuilder = UserAdminDTO.builder()
            .id(user.getId())
            .fullName(user.getFullName())
            .avatarFileName(user.getAvatarFileName())
            .email(user.getEmail())
            .emailConfirmed(user.getEmailConfirmed())
            .registeredBy(user.getRegisteredBy())
            .isUsePasswordStub(
                user.getPassword().equals(UserService.SOCIAL_SIGNUP_USER_PASSWORD_STUB) && user.getRegisteredBy() != RegisteredBy.NATIVE
            )
            .creationDate(user.getCreationDate())
            .updateDate(user.getUpdateDate())
            .roles(user.getRoles().stream().map(r -> new RoleDTO(r.getId(), r.getName())).collect(Collectors.toSet()));

        return userDTOBuilder.build();
    }

    public PageableResponse<UserAdminDTO> toPageableUserAdminDTO(Page<User> usersPage) {
        List<UserAdminDTO> userAdminDTOList = usersPage.get().map(this::toUserAdminDTO).toList();

        return new PageableResponse<>(
            usersPage.getTotalElements(),
            usersPage.getTotalPages(),
            usersPage.getNumber(),
            usersPage.getNumberOfElements(),
            usersPage.isLast(),
            usersPage.isFirst(),
            usersPage.hasPrevious(),
            usersPage.hasNext(),
            userAdminDTOList
        );
    }
}
