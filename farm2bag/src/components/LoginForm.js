import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "./LoginForm.css"; // ✅ Import CSS file

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); 
  const [error, setError] = useState("");

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

    onLogin({ email, password, rememberMe });
    setError("");
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
