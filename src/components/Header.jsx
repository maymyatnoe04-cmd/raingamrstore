import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass sticky top-0 z-50 px-4 py-3"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
            R
          </div>
          <span className="font-bold text-xl text-sky-800">Rain'Game Store</span>
        </Link>
        
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sky-700 hover:text-sky-900 font-medium">
                Dashboard
              </Link>
              <Link to="/wallet" className="text-sky-700 hover:text-sky-900 font-medium">
                Wallet
              </Link>
              <button 
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sky-700 hover:text-sky-900 font-medium">
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-sky-400 to-blue-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  )
}

export default Header
