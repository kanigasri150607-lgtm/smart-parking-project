
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);
  const [customer, setCustomer] = useState(null);

  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [vehicleId, setVehicleId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const loadData = () => {
    fetch("http://localhost:8080/parking-slots")
      .then((res) => res.json())
      .then((data) => setSlots(data));

    fetch("http://localhost:8080/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  };

  const register = () => {
    const data = {
      user_id: Number(userId),
      full_name: fullName,
      email: email,
      phone: phone,
      username: username,
      password: password
    };

    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Registration failed");
        return res.json();
      })
      .then(() => {
        alert("Registration successful!");
        setPage("login");
      })
      .catch((err) => alert(err.message));
  };

  const login = () => {
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid username or password");
        return res.json();
      })
      .then((data) => {
        setCustomer(data);
        setLoggedIn(true);
        loadData();
      })
      .catch((err) => alert(err.message));
  };

  const bookSlot = () => {
    if (!selectedSlot || !vehicleId || !bookingDate ||
        !startTime || !endTime) {
      alert("Please fill all fields");
      return;
    }

    const booking = {
      user_id: customer.user_id,
      vehicle_id: Number(vehicleId),
      slot_id: selectedSlot.slot_id,
      booking_date: bookingDate,
      start_time: startTime,
      end_time: endTime,
      booking_status: "Confirmed",
      payment_status: "Pending"
    };

    fetch("http://localhost:8080/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Booking failed");
        return res.json();
      })
      .then(() => {
        alert("Booking successful!");
        setSelectedSlot(null);
        loadData();
      })
      .catch((err) => alert(err.message));
  };

  const cancelBooking = (id) => {
    fetch(`http://localhost:8080/bookings/${id}/cancel`, {
      method: "PUT"
    })
      .then((res) => res.json())
      .then(() => {
        alert("Booking cancelled!");
        loadData();
      });
  };

    const makePayment = (id) => {
  fetch(`http://localhost:8080/bookings/${id}/pay`, {
    method: "PUT"
  })
    .then((res) => {
      if (!res.ok) throw new Error("Payment failed");
      return res.json();
    })
    .then(() => {
      alert("Demo Payment Successful!");
      loadData();
    })
    .catch((err) => alert(err.message));
};

  if (!loggedIn) {
    return (
      <div className="app">
        <h1>Smart Parking System</h1>

        {page === "register" ? (
          <div className="booking-form">
            <h2>Register</h2>

            <input placeholder="User ID"
              onChange={(e) => setUserId(e.target.value)} />

            <input placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)} />

            <input placeholder="Email"
              onChange={(e) => setEmail(e.target.value)} />

            <input placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)} />

            <input placeholder="Username"
              onChange={(e) => setUsername(e.target.value)} />

            <input type="password" placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} />

            <button onClick={register}>Register</button>
            <button onClick={() => setPage("login")}>Go to Login</button>
          </div>
        ) : (
          <div className="booking-form">
            <h2>Login</h2>

            <input placeholder="Username"
              onChange={(e) => setUsername(e.target.value)} />

            <input type="password" placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} />

            <button onClick={login}>Login</button>
            <button onClick={() => setPage("register")}>
              Create Account
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Smart Parking System</h1>
      <p>Welcome, {customer.full_name}</p>

      <button onClick={() => {
        setLoggedIn(false);
        setCustomer(null);
      }}>
        Logout
      </button>

      <div className="slots">
        {slots.map((slot) => (
          <div className="slot-card" key={slot.slot_id}>
            <h2>{slot.slot_number}</h2>
            <p>Slot ID: {slot.slot_id}</p>

            <p className={
              slot.slot_status === "Available" ? "available" : "occupied"
            }>
              {slot.slot_status}
            </p>

            {slot.slot_status === "Available" && (
              <button onClick={() => setSelectedSlot(slot)}>
                Book Slot
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedSlot && (
        <div className="booking-form">
          <h2>Book Slot {selectedSlot.slot_number}</h2>

          <input placeholder="Vehicle ID"
            onChange={(e) => setVehicleId(e.target.value)} />

          <input type="date"
            onChange={(e) => setBookingDate(e.target.value)} />

          <input type="time"
            onChange={(e) => setStartTime(e.target.value)} />

          <input type="time"
            onChange={(e) => setEndTime(e.target.value)} />

          <button onClick={bookSlot}>Confirm Booking</button>
          <button onClick={() => setSelectedSlot(null)}>Close</button>
        </div>
      )}

      <div className="booking-form">
        <h2>Booking History</h2>

        {bookings.map((booking) => (
          <div className="slot-card" key={booking.booking_id}>
            <p>Booking ID: {booking.booking_id}</p>
            <p>Slot ID: {booking.slot_id}</p>
            <p>Date: {booking.booking_date}</p>
            <p>Status: {booking.booking_status}</p>
            <p>Payment: {booking.payment_status || "Pending"}</p>

{booking.booking_status !== "Cancelled" && (
  <button onClick={() => makePayment(booking.booking_id)}>
    Pay Now
  </button>
)}

            {booking.booking_status !== "Cancelled" && (
              <button onClick={() => cancelBooking(booking.booking_id)}>
                Cancel Booking
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;