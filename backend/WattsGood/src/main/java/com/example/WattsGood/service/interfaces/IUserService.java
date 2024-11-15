package com.example.WattsGood.service.interfaces;

import com.example.WattsGood.model.User;
import com.example.WattsGood.util.UserRole;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    User createUser(User user);
    User activateUser(User user);
    List<User> getAllUsers();
    Optional<User> getById(Long id);
    Optional<User> getByEmail(String email);
    List<User> getByRole(UserRole role);
    User createSuperAdmin();
}
