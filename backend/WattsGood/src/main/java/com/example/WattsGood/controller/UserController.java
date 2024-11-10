package com.example.WattsGood.controller;

import com.example.WattsGood.dto.LoginDTO;
import com.example.WattsGood.dto.UserDTO;
import com.example.WattsGood.model.Property;
import com.example.WattsGood.model.User;
import com.example.WattsGood.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private IUserService userService;

    @GetMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> login(@RequestBody LoginDTO loginDTO) {
        try {
            Optional<User> optionalUser = userService.getByEmail(loginDTO.getEmail());

            if(optionalUser.isPresent()){
                User user = optionalUser.get();
                if (user.getPassword().equals(loginDTO.getPassword()) && !user.isBlocked()){

                    if(!user.isActive()){
                        return new ResponseEntity<>(new UserDTO(user), HttpStatus.FORBIDDEN);
                    }
                    return new ResponseEntity<>(new UserDTO(user), HttpStatus.OK);
                }
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> register(@RequestBody UserDTO userDTO) {
        try {
            if(userService.getByEmail(userDTO.getEmail()).isPresent()){
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }

            User user = userService.createUser(new User(userDTO, true));

            return new ResponseEntity<>(new UserDTO(user),HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
