package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "parking_slot")
public class ParkingSlot {

    @Id
    private Integer slot_id;

    private String slot_number;
    private String slot_status;
    private Integer lot_id;

    public ParkingSlot() {
    }

    public Integer getSlot_id() {
        return slot_id;
    }

    public void setSlot_id(Integer slot_id) {
        this.slot_id = slot_id;
    }

    public String getSlot_number() {
        return slot_number;
    }

    public void setSlot_number(String slot_number) {
        this.slot_number = slot_number;
    }

    public String getSlot_status() {
        return slot_status;
    }

    public void setSlot_status(String slot_status) {
        this.slot_status = slot_status;
    }

    public Integer getLot_id() {
        return lot_id;
    }

    public void setLot_id(Integer lot_id) {
        this.lot_id = lot_id;
    }
}