package com.example.WattsGood.service;

import com.example.WattsGood.model.Household;
import com.example.WattsGood.model.Property;
import com.example.WattsGood.model.User;
import com.example.WattsGood.repository.IPropertyRepository;
import com.example.WattsGood.repository.IUserRepository;
import com.example.WattsGood.service.interfaces.IAuthenticationService;
import com.example.WattsGood.service.interfaces.IPropertyService;
import com.example.WattsGood.util.PropertyRequest;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.data.domain.Pageable;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PropertyService implements IPropertyService {

    @Autowired
    private IPropertyRepository propertyRepository;

    @Autowired
    IUserRepository userRepository;

    @Autowired
    EmailService emailService;

    @Value("${property.images.dir}")
    private String imageDirectory;

    @Value("${property.pdfs.dir}")
    private String pdfDirectory;

    @Override
    public Property createPropertyWithFiles(Property property, List<MultipartFile> images, List<MultipartFile> pdfs) throws IOException {

        for (Household household : property.getHouseholds()) {
            household.setProperty(property);
            household.setOwner(null);
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        property.setOwner((User) authentication.getPrincipal());

        propertyRepository.save(property);

        String propertyImageDir = imageDirectory + "/" + property.getId();
        String propertyPdfDir = pdfDirectory + "/" + property.getId();

        createDirectoryIfNotExists(propertyImageDir);
        createDirectoryIfNotExists(propertyPdfDir);

        for (MultipartFile image : images) {
            saveFile(image, propertyImageDir);
        }
        for (MultipartFile pdf : pdfs) {
            saveFile(pdf, propertyPdfDir);
        }
        return property;
    }

    private void saveFile(MultipartFile file, String directory) throws IOException {
        Path path = Paths.get(directory + "/" + file.getOriginalFilename());
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
    }

    private void createDirectoryIfNotExists(String directory) {
        Path path = Paths.get(directory);
        if (!Files.exists(path)) {
            try {
                Files.createDirectories(path);
            } catch (IOException e) {
                throw new RuntimeException("Could not create directory: " + directory, e);
            }
        }
    }

    @Override
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Page<Property> findPropertiesWithFilters(String ownerEmail, Long city, String address,
                                                    PropertyRequest requestStatus, String search,String sortColumn, String sortDirection, Pageable pageable) {

        return propertyRepository.findFilteredPropertiesWithSearch(ownerEmail, city, address, requestStatus, search, sortColumn, sortDirection, pageable);
    }

    @Override
    public Optional<Property> getById(Long id) {
        return propertyRepository.findById(String.valueOf(id));
    }

    @Override
    public Page<Property> findByRequestStatus(PropertyRequest status, Pageable pageable) {
        return propertyRepository.findAllByRequestStatus(status,pageable);
    }

    @Override
    public Page<Property> findByOwnerPaginated(String ownerEmail, Pageable pageable) {
        return propertyRepository.findAllByOwnerEmail(ownerEmail,pageable);
    }

    @Override
    public Property acceptPropertyRequest(Long id) throws MessagingException {
        Property property = propertyRepository.findById(String.valueOf(id)).get();
        property.setRequestStatus(PropertyRequest.Accepted);
        property.setCompletionDate(LocalDateTime.now());
        emailService.sendPropertyAcceptanceEmail(property.getOwner().getEmail());
        return propertyRepository.save(property);
    }

    @Override
    public Property declinePropertyRequest(Long id,String reason) throws MessagingException {
        Property property = propertyRepository.findById(String.valueOf(id)).get();
        property.setRequestStatus(PropertyRequest.Declined);
        property.setCompletionDate(LocalDateTime.now());
        emailService.sendPropertyRejectionEmail(property.getOwner().getEmail(),reason);
        return propertyRepository.save(property);
    }

    @Override
    public List<Property> findByOwner(Long ownerId) {

        return propertyRepository.findAllByOwnerId(ownerId);
    }

}
