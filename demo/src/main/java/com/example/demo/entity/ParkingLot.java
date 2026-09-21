package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "parking_lot")
public class ParkingLot {

    @Id
    private Integer lot_id;

    private String lot_name;
    private String location;
    private Integer total_slots;

    public ParkingLot() {
    }

    public Integer getLot_id() {
        return lot_id;
    }

    public void setLot_id(Integer lot_id) {
        this.lot_id = lot_id;
    }

    public String getLot_name() {
        return lot_name;
    }

    public void setLot_name(String lot_name) {
        this.lot_name = lot_name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getTotal_slots() {
        return total_slots;
    }

    public void setTotal_slots(Integer total_slots) {
        this.total_slots = total_slots;
    }
}