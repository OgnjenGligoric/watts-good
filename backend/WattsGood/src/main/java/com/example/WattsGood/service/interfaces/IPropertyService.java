package com.example.WattsGood.service.interfaces;

import com.example.WattsGood.model.Property;
import com.example.WattsGood.util.PropertyRequest;
import jakarta.mail.MessagingException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface IPropertyService {

//    Property createProperty(Property property);
    Property createPropertyWithFiles(Property property, List<MultipartFile> images, List<MultipartFile> pdfs) throws IOException;
    Page<Property> findByOwnerPaginated(Long id, Pageable pageable);
    List<Property> getAllProperties();
    Optional<Property> getById(Long id);
    Page<Property> findByRequestStatus(PropertyRequest status, Pageable pageable);
    Property acceptPropertyRequest(Long id) throws MessagingException;
    Property declinePropertyRequest(Long id,String reason) throws MessagingException;
    List<Property> findByOwner(Long ownerId);

    Page<Property> findPropertiesWithFilters(String ownerEmail, Long city, String address, PropertyRequest requestStatus,String search, String sortColumn, String sortDirection, Pageable pageable);


}
