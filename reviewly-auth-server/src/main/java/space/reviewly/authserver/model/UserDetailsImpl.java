package space.reviewly.authserver.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

/**
 * User details
 *
 * @author Shcherbachenya Igor
 */
@Getter
@Setter
public class UserDetailsImpl implements UserDetails {

    private String id;

    private String userName;

    private final Collection<? extends GrantedAuthority> authorities;

    @JsonIgnore
    private String password;

    public UserDetailsImpl(User user) {
        this.id = user.getId();
        this.userName = user.getEmail();
        this.password = user.getPassword();

        this.authorities = getTestAuthorities();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        /*List<GrantedAuthority> list = new ArrayList<>();
        list.add(new SimpleGrantedAuthority("ROLE_FIRST"));
        list.add(new SimpleGrantedAuthority("ROLE_SECOND"));*/

        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    private static Collection<? extends GrantedAuthority> getTestAuthorities() {
        List<GrantedAuthority> list = new ArrayList<>();
        list.add(new SimpleGrantedAuthority("ROLE_TEST_1"));
        list.add(new SimpleGrantedAuthority("ROLE_TEST_2"));

        return list;
    }
}
