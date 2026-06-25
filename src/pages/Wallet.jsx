import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const Wallet = () => {
  const { user } = useAuth()
  const [balance, setBalance] = useState(0)
  const [deposits, setDeposits] = useState([])
  const [formData, setFormData] = useState({
    amount: '',
    payment_method: 'KBZPay',
    screenshot: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchBalance()
      fetchDeposits()
    }
  }, [user])

  const fetchBalance = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/wallet/balance')
      setBalance(res.data.balance)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchDeposits = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/deposits')
      setDeposits(res.data.deposits)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('http://localhost:8000/api/deposits', formData)
      fetchDeposits()
      setFormData({ amount: '', payment_method: 'KBZPay', screenshot: '' })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return <div className="p-8 text-center">Please login first</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="glass rounded-3xl p-8 text-center">
          <h2 className="text-sky-700 font-medium mb-2">Wallet Balance</h2>
          <p className="text-5xl font-bold text-sky-900">${balance}</p>
        </div>

        <div className="glass rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-sky-900 mb-6">Deposit Funds</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sky-800 font-medium mb-2">Amount</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white/50"
                required
              />
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
            <div>
              <label className="block text-sky-800 font-medium mb-2">Screenshot URL (Optional)</label>
              <input
                type="text"
                value={formData.screenshot}
                onChange={(e) => setFormData({ ...formData, screenshot: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white/50"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-sky-400 to-blue-500 text-white py-3 rounded-xl font-bold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Deposit Request'}
            </button>
          </form>
        </div>

        <div className="glass rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-sky-900 mb-6">Deposit History</h3>
          <div className="space-y-4">
            {deposits.length > 0 ? (
              deposits.map((deposit) => (
                <div key={deposit.id} className="flex justify-between items-center p-4 bg-white/30 rounded-xl">
                  <div>
                    <p className="font-bold text-sky-900">${deposit.amount}</p>
                    <p className="text-sky-600 text-sm">{deposit.payment_method}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      deposit.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : deposit.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {deposit.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-sky-600">No deposit history</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Wallet
