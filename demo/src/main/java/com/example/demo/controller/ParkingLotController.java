package com.example.demo.controller;

import com.example.demo.entity.ParkingLot;
import com.example.demo.repository.ParkingLotRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ParkingLotController {

    private final ParkingLotRepository parkingLotRepository;

    public ParkingLotController(ParkingLotRepository parkingLotRepository) {
        this.parkingLotRepository = parkingLotRepository;
    }

    @GetMapping("/parking-lots")
    public List<ParkingLot> getParkingLots() {
        return parkingLotRepository.findAll();
    }
}