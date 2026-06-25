import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import GameCard from '../components/GameCard'
import axios from 'axios'

const Home = () => {
  const [games, setGames] = useState([])
  const [banners, setBanners] = useState([])

  useEffect(() => {
    fetchGames()
    fetchBanners()
  }, [])

  const fetchGames = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/games')
      setGames(res.data.games)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchBanners = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/banners')
      setBanners(res.data.banners)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8 mb-8 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4">
          Welcome to Rain'Game Store
        </h1>
        <p className="text-sky-700 text-lg">
          Premium gaming top-up service with the best prices!
        </p>
      </motion.div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-sky-900 mb-6">Featured Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.length > 0 ? (
            games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))
          ) : (
            [
              { id: 1, name: 'Mobile Legends', slug: 'mobile-legends' },
              { id: 2, name: 'PUBG Mobile', slug: 'pubg-mobile' },
              { id: 3, name: 'Sausage Man', slug: 'sausage-man' },
            ].map((game) => (
              <GameCard key={game.id} game={game} />
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
