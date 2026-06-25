import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Register = () => {
const [formData, setFormData] = useState({
email: '',
password: '',
password_confirmation: ''
})

const [loading, setLoading] = useState(false)
const [error, setError] = useState('')

const { register } = useAuth()
const navigate = useNavigate()

const handleSubmit = async (e) => {
e.preventDefault()
setLoading(true)
setError('')

if (formData.password !== formData.password_confirmation) {
  setError('Passwords do not match')
  setLoading(false)
  return
}

try {
  await register({
    email: formData.email,
    password: formData.password
  })

  navigate('/')
} catch (err) {
  setError(err.message || 'Registration failed')
} finally {
  setLoading(false)
}

}

return (
<div className="flex items-center justify-center min-h-[80vh] px-4 relative z-10">
<motion.div
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
className="glass rounded-3xl p-8 w-full max-w-md"
>
<h1 className="text-3xl font-bold text-sky-900 text-center mb-8">
Register
</h1>

    {error && (
      <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sky-800 font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white/50"
          required
        />
      </div>

      <div>
        <label className="block text-sky-800 font-medium mb-2">
          Password
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white/50"
          required
        />
      </div>

      <div>
        <label className="block text-sky-800 font-medium mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          value={formData.password_confirmation}
          onChange={(e) =>
            setFormData({
              ...formData,
              password_confirmation: e.target.value
            })
          }
          className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white/50"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-sky-400 to-blue-500 text-white py-3 rounded-xl font-bold hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Register'}
      </button>
    </form>

    <p className="text-center mt-6 text-sky-700">
      Already have an account?{' '}
      <Link to="/login" className="font-bold text-sky-900 hover:underline">
        Login
      </Link>
    </p>
  </motion.div>
</div>

)
}

export default Register
