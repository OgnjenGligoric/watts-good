package com.example.WattsGood.controller;

import com.example.WattsGood.dto.ImageUploadResponse;
import com.example.WattsGood.dto.UserDTO;
import com.example.WattsGood.model.User;
import com.example.WattsGood.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/images")
public class UploadController {

    @Autowired
    private IUserService userService;

    @Value("${upload.dir}/user_images")
    private String USER_IMAGE_DIRECTORY;


    @PostMapping("/upload/{email}")
    public ResponseEntity<ImageUploadResponse> uploadFile(@RequestParam("image") MultipartFile file,
                                                          @PathVariable("email") String email) throws IOException {
        System.out.println("Email: " + email);

        Optional<User> optionalUser = userService.getByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            String originalFilename = file.getOriginalFilename();

            String extension = "";

            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String filename = user.getId() + extension;
            Path fileStorage = Paths.get(USER_IMAGE_DIRECTORY, filename).toAbsolutePath().normalize();

            if (!Files.exists(fileStorage.getParent())) {
                System.out.println("da1");
                Files.createDirectories(fileStorage.getParent());
            }

            try {
                Files.copy(file.getInputStream(), fileStorage, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                System.err.println("Error copying file: " + e.getMessage());
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            System.out.println("da2");

            return new ResponseEntity<>(new ImageUploadResponse(file.getOriginalFilename()), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
