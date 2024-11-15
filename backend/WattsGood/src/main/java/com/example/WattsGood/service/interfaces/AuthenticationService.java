package com.example.WattsGood.service.interfaces;

import com.example.WattsGood.dto.LoginDTO;
import com.example.WattsGood.dto.UserDTO;
import com.example.WattsGood.model.User;
import com.example.WattsGood.util.exceptions.UserAlreadyExistsException;
import com.example.WattsGood.util.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;


@Service
public class AuthenticationService implements IAuthenticationService{
    @Autowired
    private IUserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public User register(UserDTO userDTO) throws UserAlreadyExistsException {
        if(userService.getByEmail(userDTO.getEmail()).isPresent()){
            throw new UserAlreadyExistsException("User already exists with email " + userDTO.getEmail());
        }
        User user = userService.createUser(new User(userDTO, true));

        //add a part where email sender sends an html with a link to frontend that includes {email}/{encoded_password} emailService.sendEmail(userDTO.getEmail(), "Confirm Watts Good Email", "HTML");
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
