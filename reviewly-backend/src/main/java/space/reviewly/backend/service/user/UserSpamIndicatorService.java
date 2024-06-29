package space.reviewly.backend.service.user;

import static java.text.MessageFormat.format;

import java.util.List;
import java.util.NoSuchElementException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import space.reviewly.backend.model.user.UserSpamIndicator;
import space.reviewly.backend.repository.UserSpamIndicatorRepository;

@Slf4j
@AllArgsConstructor
@Service
@Transactional(readOnly = true)
public class UserSpamIndicatorService {

    private final UserSpamIndicatorRepository userSpamIndicatorRepository;

    public UserSpamIndicator getByUserId(String userId) throws NoSuchElementException {
        return userSpamIndicatorRepository.findByUserId(userId).orElseThrow(() -> {
            log.error("Spam indicator not found for user {} id", userId);
            return new NoSuchElementException(format("Spam indicator not found for user {0} id.", userId));
        });
    }

    public List<UserSpamIndicator> getUserSpamIndicatorsByUserIds(List<String> userIds) {
        return userSpamIndicatorRepository.findByUserIdIn(userIds);
    }

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
