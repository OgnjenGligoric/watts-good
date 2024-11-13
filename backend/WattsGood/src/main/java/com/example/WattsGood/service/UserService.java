package com.example.WattsGood.service;

import com.example.WattsGood.model.User;
import com.example.WattsGood.repository.IUserRepository;
import com.example.WattsGood.service.interfaces.IUserService;
import com.example.WattsGood.util.PasswordGenerator;
import com.example.WattsGood.util.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

@Service
public class UserService implements IUserService {

    private static final int PASSWORD_LENGTH = 12;

    private static final String ADMIN_PATH = "./WattsGood/src/main/java/com/example/WattsGood/uploads/superAdminPassword.txt";

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private PasswordGenerator passwordGenerator;

    @Override
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User activateUser(User user) {
        user.setActive(true);
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getByRole(UserRole role) {
        return userRepository.findByRole(role);
    }

    @Override
    public User createSuperAdmin() {
        if (this.getByRole(UserRole.SuperAdmin).isEmpty()) {
            String password = passwordGenerator.generateRandomPassword(PASSWORD_LENGTH);
            User superAdmin = new User();
            superAdmin.setEmail("admin");
            superAdmin.setPassword(password);
            superAdmin.setName("Admin");
            superAdmin.setSurname("Admin");
            superAdmin.setCountry("Serbia");
            superAdmin.setCity("Sirig");
            superAdmin.setStreet("Dunavska");
            superAdmin.setPhone("0656424503");
            superAdmin.setBlocked(false);
            superAdmin.setRole(UserRole.SuperAdmin);
            superAdmin.setActive(false);
            superAdmin = this.createUser(superAdmin);

            SuperAdminPasswordToFile(password);

            return superAdmin;
        }

        return this.getByRole(UserRole.SuperAdmin).get(0);
    }

    @Override
    public User changeUserPassword(User user, String password) {
        user.setPassword(passwordEncoder.encode(password));
        if(user.getRole() == UserRole.SuperAdmin){
            SuperAdminPasswordToFile(password);
        }
        return userRepository.save(user);
    }

    private void SuperAdminPasswordToFile(String password) {
        File file = new File(ADMIN_PATH);

        try {
            if (!file.exists()) {
                file.createNewFile();
            }

            FileWriter writer = new FileWriter(file);
            writer.write(password);
            writer.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}
