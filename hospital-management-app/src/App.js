"use client"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Patients from "./pages/Patients"
import Doctors from "./pages/Doctors"
import Appointments from "./pages/Appointments"
import MedicalRecords from "./pages/MedicalRecords"
import Layout from "./components/Layout"
import Home from "./pages/Home"

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/home" />
}

const PublicRoute = ({ children }) => {
  const { user } = useAuth()
  return !user ? children : <Navigate to="/dashboard" />
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
          </Route>
          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Patients />} />
          </Route>
          <Route
            path="/doctors"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Doctors />} />
          </Route>
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Appointments />} />
          </Route>
          <Route
            path="/medical-records"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<MedicalRecords />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
