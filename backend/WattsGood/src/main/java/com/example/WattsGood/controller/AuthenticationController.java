package com.example.WattsGood.controller;

import com.example.WattsGood.dto.LoginDTO;
import com.example.WattsGood.dto.LoginResponse;
import com.example.WattsGood.dto.UserDTO;
import com.example.WattsGood.model.User;
import com.example.WattsGood.service.JwtService;
import com.example.WattsGood.service.interfaces.AuthenticationService;
import com.example.WattsGood.util.exceptions.UserAlreadyExistsException;
import com.example.WattsGood.util.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


@RequestMapping("/api/auth")
@RestController
public class AuthenticationController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationService authenticationService;

    @Value("${upload.dir}")
    private String USER_IMAGE_DIRECTORY;

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> register(@RequestBody UserDTO userDTO, @RequestParam("image") MultipartFile file) {
        try {
            User registeredUser = authenticationService.register(userDTO);

            String originalFilename = file.getOriginalFilename();
            String extension = "";

            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            String filename = registeredUser.getId() + extension;

            Path fileStorage = Paths.get(USER_IMAGE_DIRECTORY, filename).toAbsolutePath().normalize();

            Files.copy(file.getInputStream(), fileStorage, StandardCopyOption.REPLACE_EXISTING);

            return new ResponseEntity<>(new UserDTO(registeredUser), HttpStatus.CREATED);

        } catch (UserAlreadyExistsException | IOException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginDTO loginDTO) {
        try {
            User authenticatedUser = authenticationService.authenticate(loginDTO);

            String jwtToken = jwtService.generateToken(authenticatedUser);

            LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());

            if (authenticatedUser.isBlocked()) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            return new ResponseEntity<>(loginResponse, HttpStatus.OK);

        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


    }
}
