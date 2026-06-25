import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const GameCard = ({ game }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="glass rounded-3xl p-4 cursor-pointer"
    >
      <Link to={`/game/${game.slug}`} className="block">
        <div className="relative rounded-2xl overflow-hidden h-48 bg-gradient-to-br from-sky-300 to-blue-400 flex items-center justify-center">
          <span className="text-6xl">🎮</span>
        </div>
        <div className="mt-4">
          <h3 className="font-bold text-lg text-sky-900">{game.name}</h3>
          <p className="text-sky-600 text-sm mt-1">Top Up Now</p>
        </div>
      </Link>
    </motion.div>
  )
}

export default GameCard
