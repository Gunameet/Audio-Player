import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./pages/LoginForm.jsx";
// import Playlist from "./pages/Playlist.jsx";
import Header from "./Components/Header.jsx";
// import Navbar from "./Components/Navbar.jsx";
import Homepage from "./pages/Homepage.jsx";
// import Footer from "./Components/Footer.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth === "true") setIsLoggedIn(true);
  }, []);

  const handleLogin = (username, password) => {
    if (username === "Akshardham" && password === "Akshardham@123") {
      setIsLoggedIn(true);
      localStorage.setItem("auth", "true");
    } else {
      alert("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("auth");
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          isLoggedIn ? <Homepage /> : <Navigate to="/login" replace />
        } />

        <Route path="/login" element={
          !isLoggedIn ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <Navigate to="/" replace />
          )
        }
        />

        {/* <Route path="/playlist" element={
          isLoggedIn ? (
            <Playlist onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
        /> */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}
