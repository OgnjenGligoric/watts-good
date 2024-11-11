package com.example.WattsGood.dto;

import com.example.WattsGood.model.User;
import com.example.WattsGood.util.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDTO {
    private Long id;
    private String email;
    private String password;
    private String name;
    private String surname;
    private String country;
    private String city;
    private String street;
    private String phone;
    private boolean blocked;
    private boolean active;
    private UserRole role;

    public UserDTO(User user) {
        ModelMapper modelMapper = new ModelMapper();

        PropertyMap<User, UserDTO> propertyMap = new PropertyMap<User, UserDTO>() {
            protected void configure() {
                map().setId(source.getId());
                map().setEmail(source.getEmail());
                map().setPassword(source.getPassword());
                map().setName(source.getName());
                map().setSurname(source.getSurname());
                map().setCountry(source.getCountry());
                map().setCity(source.getCity());
                map().setStreet(source.getStreet());
                map().setPhone(source.getPhone());
                map().setRole(source.getRole());
                map().setActive(source.isActive());
                map().setBlocked(source.isBlocked());
            }
        };
        modelMapper.addMappings(propertyMap);
        modelMapper.map(user, this);
    }
}
