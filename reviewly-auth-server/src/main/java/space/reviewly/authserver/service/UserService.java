package space.reviewly.authserver.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import space.reviewly.authserver.model.User;
import space.reviewly.authserver.repository.UserRepository;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    private final EmailService emailService;

    public User getByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Transactional
    public void registerUser(User newUser) {
        User savedUser = userRepository.save(newUser);
        emailService.sendRegistrationConfirmationMessage(savedUser);
    }
}
