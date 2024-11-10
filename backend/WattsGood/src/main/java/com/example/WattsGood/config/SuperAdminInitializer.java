package com.example.WattsGood.config;

import com.example.WattsGood.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SuperAdminInitializer implements CommandLineRunner {

    @Autowired
    private IUserService userService;
    @Override
    public void run(String... args) throws Exception {
        userService.createSuperAdmin();
    }
}
