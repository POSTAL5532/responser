package space.reviewly.authserver.security;

import org.springframework.security.core.userdetails.UserDetails;

public interface CustomUserDetails extends UserDetails {

    String getId();

    void setId(String  id);

    void setUsername(String username);

    void setPassword(String password);
}
