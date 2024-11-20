package com.example.WattsGood.service;

import com.example.WattsGood.dto.LoginDTO;
import com.example.WattsGood.dto.UserDTO;
import com.example.WattsGood.model.User;
import com.example.WattsGood.service.interfaces.IAuthenticationService;
import com.example.WattsGood.service.interfaces.IUserService;
import com.example.WattsGood.util.exceptions.UserAlreadyExistsException;
import com.example.WattsGood.util.exceptions.UserNotFoundException;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AuthenticationService implements IAuthenticationService {
    @Autowired
    private IUserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private EmailService emailService;

    public User register(UserDTO userDTO) throws UserAlreadyExistsException, MessagingException {
        Optional<User> optUser = userService.getByEmail(userDTO.getEmail());
        if(optUser.isPresent()) {
            throw new UserAlreadyExistsException("User already exists with email " + userDTO.getEmail());
        }
        User user = userService.createUser(new User(userDTO, true));
        if(!user.isActive()){
            this.emailService.sendAccountConfirmationEmail(userDTO.getEmail(), String.valueOf(user.getId()));
        }
        return user;
    }

    public User authenticate(LoginDTO loginDTO) throws UserNotFoundException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getEmail(),
                        loginDTO.getPassword()
                )
        );

        return userService.getByEmail(loginDTO.getEmail())
                .orElseThrow();
    }



}
