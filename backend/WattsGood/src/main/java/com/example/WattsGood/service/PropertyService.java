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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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

    @Override
    public Property createProperty(Property property) {

        for (Household household : property.getHouseholds()) {
            household.setProperty(property);
            household.setOwner(null);
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        property.setOwner((User) authentication.getPrincipal());

        return propertyRepository.save(property);
    }

    @Override
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    @Override
    public Optional<Property> getById(Long id) {
        return propertyRepository.findById(String.valueOf(id));
    }

    @Override
    public List<Property> findByRequestStatus(PropertyRequest status) {
        return propertyRepository.findByRequestStatus(status);
    }

    @Override
    public Property acceptPropertyRequest(Long id) throws MessagingException {
        Property property = propertyRepository.findById(String.valueOf(id)).get();
        property.setRequestStatus(PropertyRequest.Accepted);
        emailService.sendPropertyAcceptanceEmail(property.getOwner().getEmail());
        return propertyRepository.save(property);
    }

    @Override
    public Property declinePropertyRequest(Long id,String reason) throws MessagingException {
        Property property = propertyRepository.findById(String.valueOf(id)).get();
        property.setRequestStatus(PropertyRequest.Declined);

        emailService.sendPropertyRejectionEmail(property.getOwner().getEmail(),reason);
        return propertyRepository.save(property);
    }

    @Override
    public List<Property> findByOwner(Long ownerId) {
        return propertyRepository.findAllByOwnerId(ownerId);
    }

}
