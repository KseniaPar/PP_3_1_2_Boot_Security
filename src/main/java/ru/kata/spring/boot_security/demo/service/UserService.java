package ru.kata.spring.boot_security.demo.service;


import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {
    boolean saveUser(User user);
    User findUserById(long id);
    User findUserByEmail(String email);
    boolean updateUser(User user);
    void deleteUserById(long id);
    List<User> showAllUsers();

}
