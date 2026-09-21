
package com.example.demo.controller;

import com.example.demo.entity.Booking;
import com.example.demo.entity.ParkingSlot;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.ParkingSlotRepository;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class BookingController {

    private final BookingRepository bookingRepository;
    private final ParkingSlotRepository parkingSlotRepository;

    public BookingController(BookingRepository bookingRepository,
                             ParkingSlotRepository parkingSlotRepository) {
        this.bookingRepository = bookingRepository;
        this.parkingSlotRepository = parkingSlotRepository;
    }

    @GetMapping("/bookings")
    public List<Booking> getBookings() {
        return bookingRepository.findAll();
    }

    @PostMapping("/bookings")
    public Booking createBooking(@RequestBody Booking booking) {

        ParkingSlot slot = parkingSlotRepository
                .findById(booking.getSlot_id())
                .orElseThrow(() -> new RuntimeException("Parking slot not found"));

        if (slot.getSlot_status().equals("Occupied")) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Parking slot is already occupied"
            );
        }

        Booking savedBooking = bookingRepository.save(booking);

        slot.setSlot_status("Occupied");
        parkingSlotRepository.save(slot);

        return savedBooking;
    }

    @PutMapping("/bookings/{id}/cancel")
    public Booking cancelBooking(@PathVariable Integer id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setBooking_status("Cancelled");

        ParkingSlot slot = parkingSlotRepository
                .findById(booking.getSlot_id())
                .orElseThrow(() -> new RuntimeException("Parking slot not found"));

        slot.setSlot_status("Available");
        parkingSlotRepository.save(slot);

        return bookingRepository.save(booking);
    }
    @PutMapping("/bookings/{id}/pay")
    public Booking makePayment(@PathVariable Integer id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setPayment_status("Paid");

        return bookingRepository.save(booking);
    }
}