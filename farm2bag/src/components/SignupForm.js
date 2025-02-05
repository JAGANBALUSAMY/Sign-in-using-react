import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "./SignupForm.css"; 

function SignupForm({ onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("farmer");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setError("Name can only contain letters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!name || !email || !password || !confirmPassword || !dob || !phone) {
      setError("Please fill in all fields.");
      return;
    }

    onSignup({ name, email, password, role, dob, phone });
    setError("");
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
        </select>
        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>}
      </form>

      {/* ✅ Add Login Redirect */}
      <p className="redirect-text">
        Already have an account? <Link to="/login">Click here</Link>
      </p>
    </div>
  );
}

export default SignupForm;
