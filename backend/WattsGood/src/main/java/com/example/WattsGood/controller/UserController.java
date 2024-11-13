package com.example.WattsGood.controller;

import com.example.WattsGood.dto.UserDTO;
import com.example.WattsGood.model.User;
import com.example.WattsGood.service.interfaces.AuthenticationService;
import com.example.WattsGood.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/api/users")
@RestController
public class UserController {
    @Autowired
    private IUserService userService;

    @Autowired
    private AuthenticationService authenticationService;
    @PostMapping(value = "/activate/superAdmin/{password}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> activateUser(@PathVariable String password) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();
            user = userService.activateUser(user);
            user = userService.changeUserPassword(user,password);

            return new ResponseEntity<>(new UserDTO(user),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication.getPrincipal());
        User currentUser = (User) authentication.getPrincipal();
        System.out.println(currentUser.getEmail());

        return new ResponseEntity<>(new UserDTO(currentUser),HttpStatus.OK);
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserDTO>> allUsers() {
        List <User> users = userService.getAllUsers();

        List<UserDTO> userDTOs = new ArrayList<>();
        for (User user : users) {
            userDTOs.add(new UserDTO(user));
        }
        return new ResponseEntity<>(userDTOs,HttpStatus.OK);
    }


//    @GetMapping(value = "/send_mail")
//    public ResponseEntity<String> send_mail() {
//        emailService.sendEmail("stefandjurica666@gmail.com", "Niggers", "jigaboo");
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
}
