import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

import {
  collection,
  query,
  where,
  getDocs,
  addDoc
} from 'firebase/firestore'

import { db } from '../firebase'

const GameDetail = () => {
  const { slug } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [game, setGame] = useState(null)

  const [formData, setFormData] = useState({
    user_id_game: '',
    server_id: '',
    package_id: '',
    payment_method: 'KBZPay'
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadGame()
  }, [slug])

  const loadGame = async () => {
    const q = query(
      collection(db, 'games'),
      where('slug', '==', slug)
    )

    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      setGame({
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data()
      })
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
      await addDoc(collection(db, 'orders'), {
        ...formData,
        game_id: game.id,
        game_name: game.name,
        email: user.email,
        status: 'Pending',
        created_at: new Date()
      })

      navigate('/orders')
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  if (!game)
    return <div className="p-8 text-center">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-3xl p-8"
      >

        <h1 className="text-3xl font-bold text-center mb-8">
          {game.name}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            placeholder="User ID"
            className="w-full border rounded-xl p-3"
            value={formData.user_id_game}
            onChange={(e)=>
              setFormData({
                ...formData,
                user_id_game:e.target.value
              })
            }
          />

          <input
            placeholder="Server ID"
            className="w-full border rounded-xl p-3"
            value={formData.server_id}
            onChange={(e)=>
              setFormData({
                ...formData,
                server_id:e.target.value
              })
            }
          />

          <button
            disabled={loading}
            className="w-full bg-blue-500 text-white rounded-xl p-3"
          >
            {loading ? 'Processing...' : 'Top Up'}
          </button>

        </form>

      </motion.div>

    </div>
  )
}

export default GameDetail