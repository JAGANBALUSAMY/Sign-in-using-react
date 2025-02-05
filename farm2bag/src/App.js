import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import "./App.css"; // ✅ Import CSS file

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (data) => {
    console.log("Logging in with", data);
    setUser({ email: data.email, role: data.role });
  };

  const handleSignup = (data) => {
    console.log("Signing up with", data);
    setUser({ email: data.email, role: data.role });
  };

  return (
    <Router>
      <div><header>
          <nav>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </ul>
          </nav>
        </header></div>
      <div className="App">

        <Routes>
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupForm onSignup={handleSignup} />} />
        </Routes>

        {user && (
          <div className="user-info">
            <h3>Welcome {user.email} ({user.role})</h3>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
