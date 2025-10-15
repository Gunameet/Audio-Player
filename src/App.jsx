import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import LoginForm from "./pages/LoginForm.jsx"
import Header from "./Components/Header.jsx"
import Homepage from "./pages/Homepage.jsx"
import Profile from "./pages/Profile.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"
import { AuthProvider, useAuth } from "./context/AuthContext.jsx"
import ProtectedRoute from "./Components/ProtectedRoute.jsx"
import SignupForm from "./pages/SignupForm.jsx"
function AppRoutes() {

  const { t, i18n } = useTranslation()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    document.title = t("appTitle")
  }, [i18n.language, t])


  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Homepage />
        </ProtectedRoute>
      } />

      <Route
        path="/signup"
        element={
          // <ProtectedRoute>
          <SignupForm />
          // </ProtectedRoute>
        }
      />

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

      <Route
        path="/admin"
        element={
          // <ProtectedRoute role="admin">
          <AdminDashboard />
          // </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Render Header only on non-admin routes */}
        <HeaderVisibility />
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

function HeaderVisibility() {
  // useLocation is available because this component is rendered inside Router
  const location = useLocation()
  // hide header for /admin and any nested admin routes (e.g. /admin/settings)
  if (location?.pathname?.startsWith("/admin")) return null
  return <Header />
}
