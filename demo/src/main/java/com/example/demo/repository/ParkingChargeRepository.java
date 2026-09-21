package com.example.demo.repository;

import com.example.demo.entity.ParkingCharge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingChargeRepository extends JpaRepository<ParkingCharge, Integer> {
}