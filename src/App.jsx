import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginForm from "./pages/LoginForm.jsx"
import SignupForm from "./pages/SignupForm.jsx"
import Header from "./Components/Header.jsx"
import Homepage from "./pages/Homepage.jsx"
import Profile from "./pages/Profile.jsx"
import { AuthProvider, useAuth } from "./context/AuthContext.jsx"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
function AppRoutes() {

  const { t, i18n } = useTranslation()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    document.title = t("appTitle")
  }, [i18n.language])


  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route
        path="/login"
        element={!isLoggedIn ? <LoginForm /> : <Navigate to="/" replace />}
      />

      <Route
        path="/signup"
        element={!isLoggedIn ? <SignupForm /> : <Navigate to="/" replace />}
      />

      <Route
        path="/profile"
        element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}
