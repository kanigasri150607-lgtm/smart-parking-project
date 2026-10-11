
package com.example.demo.controller;

import com.example.demo.entity.Customer;
import com.example.demo.repository.CustomerRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})
public class CustomerController {

    private final CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody Customer customer) {

        if (customerRepository.findByUsernameAndPassword(
                customer.getUsername(),
                customer.getPassword()) != null) {

            return ResponseEntity.badRequest().body(
                Map.of("message", "Username already exists")
            );
        }

        customerRepository.save(customer);

        return ResponseEntity.ok(
            Map.of("message", "Registration successful")
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> data) {

        Customer customer =
            customerRepository.findByUsernameAndPassword(
                data.get("username"),
                data.get("password")
            );

        if (customer == null) {
            return ResponseEntity.status(401).body(
                Map.of("message", "Invalid username or password")
            );
        }

        return ResponseEntity.ok(
            Map.of(
                "user_id", customer.getUser_id(),
                "full_name", customer.getFull_name(),
                "username", customer.getUsername()
            )
        );
    }
}
