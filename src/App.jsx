import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import LoginForm from "./pages/LoginForm.jsx"
import Header from "./Components/Header.jsx"
import Homepage from "./pages/Homepage.jsx"
import Profile from "./pages/Profile.jsx"
import { AuthProvider, useAuth } from "./context/AuthContext.jsx"
import ProtectedRoute from "./Components/ProtectedRoute.jsx"
function AppRoutes() {

  const { t, i18n } = useTranslation()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    document.title = t("appTitle")
  }, [i18n.language])


  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Homepage />
        </ProtectedRoute>
      } />

      <Route
        path="/login"
        element={!isLoggedIn ? <LoginForm /> : <Navigate to="/" replace />}
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
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
