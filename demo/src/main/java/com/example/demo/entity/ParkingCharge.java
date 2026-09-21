package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "parking_charge")
public class ParkingCharge {

    @Id
    private Integer charge_id;

    private Integer slot_id;
    private BigDecimal amount;

    public ParkingCharge() {
    }

    public Integer getCharge_id() {
        return charge_id;
    }

    public void setCharge_id(Integer charge_id) {
        this.charge_id = charge_id;
    }

    public Integer getSlot_id() {
        return slot_id;
    }

    public void setSlot_id(Integer slot_id) {
        this.slot_id = slot_id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}