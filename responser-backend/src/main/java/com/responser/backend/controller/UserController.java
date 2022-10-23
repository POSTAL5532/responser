package com.responser.backend.controller;

import com.responser.backend.model.User;
import com.responser.backend.model.UserAccountDataPayload;
import com.responser.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;

/**
 * UserController
 *
 * @author SIE
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PreAuthorize("permitAll()")
    @PostMapping("/register")
    public ResponseEntity<Void> registerUser(@Valid @RequestBody UserAccountDataPayload userDTO) {
        userService.registerUser(userDTO);

        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/updatecurrent")
    public ResponseEntity<Void> updateUser(Principal principal, @Valid @RequestBody UserAccountDataPayload userDTO) {
        userService.updateUser(principal.getName(), userDTO);

        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/current")
    public ResponseEntity<User> getCurrentUser(Principal principal) {
        return ResponseEntity.ok(userService.getUser(principal.getName()));
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/debug")
    public ResponseEntity<String> debug(HttpServletRequest request) {
        return ResponseEntity.ok("Users-Service debug - OK!");
    }
}
