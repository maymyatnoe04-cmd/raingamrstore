import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const GameDetail = () => {
  const { slug } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [game, setGame] = useState(null)
  const [formData, setFormData] = useState({
    user_id_game: '',
    server_id: '',
    package_id: '',
    payment_method: 'KBZPay',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchGame()
  }, [slug])

  const fetchGame = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/games/${slug}`)
      setGame(res.data.game)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }
    setLoading(true)
    try {
      const data = { ...formData, game_id: game.id }
      await axios.post('http://localhost:8000/api/orders', data)
      navigate('/orders')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!game) return <div className="p-8 text-center">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8"
      >
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-sky-300 to-blue-400 rounded-3xl mx-auto flex items-center justify-center text-6xl mb-4">
            🎮
          </div>
          <h1 className="text-3xl font-bold text-sky-900">{game.name}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sky-800 font-medium mb-2">User ID</label>
            <input
              type="text"
              value={formData.user_id_game}
              onChange={(e) => setFormData({ ...formData, user_id_game: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white/50"
              required
            />
          </div>

          {game.slug === 'mobile-legends' && (
            <div>
              <label className="block text-sky-800 font-medium mb-2">Server ID</label>
              <input
                type="text"
                value={formData.server_id}
                onChange={(e) => setFormData({ ...formData, server_id: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white/50"
              />
            </div>
          )}

          <div>
            <label className="block text-sky-800 font-medium mb-2">Select Package</label>
            <div className="grid grid-cols-2 gap-3">
              {(game.packages || [
                { id: 1, name: '50 Diamonds', price: 1.99 },
                { id: 2, name: '100 Diamonds', price: 3.99 },
                { id: 3, name: '250 Diamonds', price: 9.99 },
                { id: 4, name: '500 Diamonds', price: 19.99 },
              ]).map((pkg) => (
                <label key={pkg.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="package"
                    value={pkg.id}
                    checked={formData.package_id === pkg.id}
                    onChange={(e) => setFormData({ ...formData, package_id: e.target.value })}
                    className="sr-only"
                  />
                  <div
                    className={`p-4 rounded-2xl border-2 transition ${
                      formData.package_id === pkg.id
                        ? 'border-sky-500 bg-sky-100/50'
                        : 'border-sky-200 hover:border-sky-300'
                    }`}
                  >
                    <p className="font-bold text-sky-900">{pkg.name}</p>
                    <p className="text-sky-700">${pkg.price}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sky-800 font-medium mb-2">Payment Method</label>
            <select
              value={formData.payment_method}
              onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white/50"
            >
              <option>KBZPay</option>
              <option>WavePay</option>
              <option>AYA Pay</option>
              <option>CB Pay</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-sky-400 to-blue-500 text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Top Up Now'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default GameDetail
