package com.example.demo.controller;

import com.example.demo.entity.ParkingSlot;
import com.example.demo.repository.ParkingSlotRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ParkingSlotController {

    private final ParkingSlotRepository parkingSlotRepository;

    public ParkingSlotController(ParkingSlotRepository parkingSlotRepository) {
        this.parkingSlotRepository = parkingSlotRepository;
    }

    @GetMapping("/parking-slots")
    public List<ParkingSlot> getParkingSlots() {
        return parkingSlotRepository.findAll();
    }
}