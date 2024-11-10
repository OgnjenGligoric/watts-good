package com.example.WattsGood.model;

import com.example.WattsGood.dto.UserDTO;
import com.example.WattsGood.util.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="`USERS`")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
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

    public User(UserDTO userDTO) {
        this(userDTO, false);
    }

    public User(UserDTO userDTO, boolean isNew) {
        if(!isNew){
            this.id = userDTO.getId();
        }
        this.email = userDTO.getEmail();
        this.password = userDTO.getPassword();
        this.name = userDTO.getName();
        this.surname = userDTO.getSurname();
        this.country = userDTO.getCountry();
        this.city = userDTO.getCity();
        this.street = userDTO.getStreet();
        this.phone = userDTO.getPhone();
        this.blocked = userDTO.isBlocked();
        this.active = userDTO.isActive();
        this.role = userDTO.getRole();
    }
}
