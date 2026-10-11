
import { useState } from "react";
import "./App.css";

const API_URL = "https://smart-parking-backend-osys.onrender.com";

function formatDate(date) {
  if (!date) return "";
  const parts = date.split("-");
  if (parts.length !== 3) return date;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

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
    fetch(`${API_URL}/parking-slots`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not load parking slots");
        return res.json();
      })
      .then((data) => setSlots(data))
      .catch((err) => alert(err.message));

    fetch(`${API_URL}/bookings`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not load bookings");
        return res.json();
      })
      .then((data) => setBookings(data))
      .catch((err) => alert(err.message));
  };

  const register = () => {
    const data = {
      user_id: Number(userId),
      full_name: fullName,
      email,
      phone,
      username,
      password,
    };

    fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
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
    if (!selectedSlot || !vehicleId || !bookingDate || !startTime || !endTime) {
      alert("Please fill all fields");
      return;
    }

    if (endTime <= startTime) {
      alert("End time must be after start time");
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
      payment_status: "Pending",
    };

    fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Booking failed");
        return res.json();
      })
      .then(() => {
        alert("Booking successful!");
        setSelectedSlot(null);
        setVehicleId("");
        setBookingDate("");
        setStartTime("");
        setEndTime("");
        loadData();
      })
      .catch((err) => alert(err.message));
  };

  const cancelBooking = (id) => {
    fetch(`${API_URL}/bookings/${id}/cancel`, { method: "PUT" })
      .then((res) => {
        if (!res.ok) throw new Error("Cancellation failed");
        return res.json();
      })
      .then(() => {
        alert("Booking cancelled!");
        loadData();
      })
      .catch((err) => alert(err.message));
  };

  const makePayment = (id) => {
    fetch(`${API_URL}/bookings/${id}/pay`, { method: "PUT" })
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
            <input placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={register}>Register</button>
            <button onClick={() => setPage("login")}>Go to Login</button>
          </div>
        ) : (
          <div className="booking-form">
            <h2>Login</h2>
            <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={login}>Login</button>
            <button onClick={() => setPage("register")}>Create Account</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Smart Parking System</h1>
      <p>Welcome, {customer?.full_name}</p>

      <button onClick={() => {
        setLoggedIn(false);
        setCustomer(null);
        setPage("login");
      }}>
        Logout
      </button>

      <div className="slots">
        {slots.map((slot) => (
          <div className="slot-card" key={slot.slot_id}>
            <h2>{slot.slot_number}</h2>
            <p>Slot ID: {slot.slot_id}</p>
            <p className={slot.slot_status === "Available" ? "available" : "occupied"}>
              {slot.slot_status}
            </p>
            {slot.slot_status === "Available" && (
              <button onClick={() => {
                setSelectedSlot(slot);
                setBookingDate("");
              }}>
                Book Slot
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedSlot && (
        <div className="booking-form">
          <h2>Book Slot {selectedSlot.slot_number}</h2>
          <input placeholder="Vehicle ID" value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} />
          <label>Select Booking Date:</label>
          <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
          <p>Selected Date (DD/MM/YYYY): {bookingDate ? formatDate(bookingDate) : "Not selected"}</p>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
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
            <p>
              Date: {formatDate(
                typeof booking.booking_date === "string"
                  ? booking.booking_date.substring(0, 10)
                  : ""
              )}
            </p>
            <p>Status: {booking.booking_status}</p>
            <p>Payment: {booking.payment_status || "Pending"}</p>

            {booking.booking_status !== "Cancelled" && booking.payment_status !== "Paid" && (
              <button onClick={() => makePayment(booking.booking_id)}>Pay Now</button>
            )}

            {booking.booking_status !== "Cancelled" && (
              <button onClick={() => cancelBooking(booking.booking_id)}>Cancel Booking</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
