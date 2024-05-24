package space.reviewly.backend.service.user;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import space.reviewly.backend.model.user.UserSpamIndicator;
import space.reviewly.backend.repository.UserSpamIndicatorRepository;

@AllArgsConstructor
@Service
@Transactional(readOnly = true)
public class UserSpamIndicatorService {

    private final UserSpamIndicatorRepository userSpamIndicatorRepository;

    @Transactional
    public void incrementOrCreateAndIncrementIndicator(String userId) {
        UserSpamIndicator userSpamIndicator = userSpamIndicatorRepository.findByUserId(userId).orElseGet(() -> {
            UserSpamIndicator newUserSpamIndicator = new UserSpamIndicator();
            newUserSpamIndicator.setUserId(userId);
            newUserSpamIndicator.setSpamCounter(0);

            return newUserSpamIndicator;
        });

        userSpamIndicator.setSpamCounter(userSpamIndicator.getSpamCounter() + 1);

        userSpamIndicatorRepository.save(userSpamIndicator);
    }
}
