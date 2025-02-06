import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "./LoginForm.css"; // ✅ Import CSS file

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer"); // ✅ Default role to farmer
  const [rememberMe, setRememberMe] = useState(false); 
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    onLogin({ email, password, role, rememberMe });
    setError("");

    // ✅ Redirect based on role
    if (role === "farmer") {
      navigate("/farmer-dashboard"); // ✅ Navigate to the farmer's dashboard
    } else {
      navigate("/buyer-dashboard"); // ✅ Navigate to buyer's page
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
        </select>

        <label className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember me
        </label>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>

      {/* ✅ Add Signup Redirect */}
      <p className="redirect-text">
        Don't have an account? <Link to="/signup">Click here</Link>
      </p>
    </div>
  );
}

export default LoginForm;
