import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./pages/LoginForm.jsx";
import SignupForm from "./pages/SignupForm.jsx";
import Header from "./Components/Header.jsx";
import Homepage from "./pages/Homepage.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check auth from localStorage when app loads
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setIsLoggedIn(auth === "true");
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <LoginForm />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/signup"
          element={
            !isLoggedIn ? (
              <SignupForm />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
