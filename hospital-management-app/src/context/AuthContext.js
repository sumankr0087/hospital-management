"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const foundUser = users.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      return { success: true }
    }
    return { success: false, error: "Invalid email or password" }
  }

  const register = (email, password, name) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      return { success: false, error: "User already exists" }
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("user", JSON.stringify(userWithoutPassword))

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}
