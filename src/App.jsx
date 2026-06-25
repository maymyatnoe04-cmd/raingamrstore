import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import GameDetail from './pages/GameDetail'
import Dashboard from './pages/Dashboard'
import Wallet from './pages/Wallet'
import Orders from './pages/Orders'
import Header from './components/Header'
import FloatingBubbles from './components/FloatingBubbles'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-blue-100 relative overflow-hidden">
          <FloatingBubbles />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/game/:slug" element={<GameDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
