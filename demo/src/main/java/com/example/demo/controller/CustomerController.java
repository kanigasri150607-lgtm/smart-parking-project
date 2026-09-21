package com.example.demo.controller;

import com.example.demo.entity.Customer;
import com.example.demo.repository.CustomerRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    private final CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @PostMapping("/register")
    public Customer register(@RequestBody Customer customer) {
        return customerRepository.save(customer);
    }

    @PostMapping("/login")
    public Customer login(@RequestBody Customer customer) {

        Customer existingCustomer =
                customerRepository.findByUsernameAndPassword(
                        customer.getUsername(),
                        customer.getPassword()
                );

        if (existingCustomer == null) {
            throw new RuntimeException("Invalid username or password");
        }

        return existingCustomer;
    }
}