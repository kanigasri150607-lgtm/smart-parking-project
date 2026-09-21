package com.example.demo.controller;

import com.example.demo.entity.ParkingCharge;
import com.example.demo.repository.ParkingChargeRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ParkingChargeController {

    private final ParkingChargeRepository parkingChargeRepository;

    public ParkingChargeController(ParkingChargeRepository parkingChargeRepository) {
        this.parkingChargeRepository = parkingChargeRepository;
    }

    @GetMapping("/parking-charges")
    public List<ParkingCharge> getParkingCharges() {
        return parkingChargeRepository.findAll();
    }
}