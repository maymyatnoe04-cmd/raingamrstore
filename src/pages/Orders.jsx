import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const Orders = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/orders')
      setOrders(res.data.orders)
    } catch (error) {
      console.error(error)
    }
  }

  if (!user) return <div className="p-8 text-center">Please login first</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8"
      >
        <h1 className="text-3xl font-bold text-sky-900 mb-6">My Orders</h1>
        
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="p-6 bg-white/30 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold text-sky-900 text-lg">{order.order_number}</p>
                    <p className="text-sky-600">{order.game?.name || 'Game'}</p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      order.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'approved'
                        ? 'bg-blue-100 text-blue-700'
                        : order.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-sky-600">User ID</p>
                    <p className="font-medium text-sky-900">{order.user_id_game}</p>
                  </div>
                  <div>
                    <p className="text-sky-600">Package</p>
                    <p className="font-medium text-sky-900">{order.package?.name || 'Package'}</p>
                  </div>
                  <div>
                    <p className="text-sky-600">Amount</p>
                    <p className="font-medium text-sky-900">${order.amount}</p>
                  </div>
                  <div>
                    <p className="text-sky-600">Payment</p>
                    <p className="font-medium text-sky-900">{order.payment_method}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sky-600 text-lg">No orders yet</p>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default Orders
