import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()

  if (!user) return <div className="p-8 text-center">Please login first</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8"
      >
        <h1 className="text-3xl font-bold text-sky-900 mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass rounded-2xl p-6">
            <h3 className="text-sky-700 font-medium mb-2">Wallet Balance</h3>
            <p className="text-3xl font-bold text-sky-900">${user.wallet_balance || 0}</p>
          </div>
          <Link to="/orders" className="glass rounded-2xl p-6 hover:bg-white/20 transition">
            <h3 className="text-sky-700 font-medium mb-2">My Orders</h3>
            <p className="text-3xl font-bold text-sky-900">View All</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/wallet" className="glass rounded-2xl p-6 text-center hover:bg-white/20 transition">
            <p className="text-4xl mb-2">💳</p>
            <p className="font-bold text-sky-900">Wallet</p>
          </Link>
          <Link to="/orders" className="glass rounded-2xl p-6 text-center hover:bg-white/20 transition">
            <p className="text-4xl mb-2">📦</p>
            <p className="font-bold text-sky-900">Orders</p>
          </Link>
          <Link to="/" className="glass rounded-2xl p-6 text-center hover:bg-white/20 transition">
            <p className="text-4xl mb-2">🎮</p>
            <p className="font-bold text-sky-900">Top Up</p>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
