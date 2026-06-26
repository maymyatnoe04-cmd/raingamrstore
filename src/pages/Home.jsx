import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import GameCard from '../components/GameCard'

const Home = () => {
const [games, setGames] = useState([])

useEffect(() => {
loadGames()
}, [])

const loadGames = async () => {
try {
const snapshot = await getDocs(collection(db, 'games'))

  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

  setGames(data)
} catch (err) {
  console.error(err)
}

}

return ( <div className="max-w-7xl mx-auto px-4 py-8">
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
className="mb-8"
> <h1 className="text-4xl font-bold text-center">
Welcome to Rain Game Store </h1>
</motion.div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {games.map(game => (
      <GameCard key={game.id} game={game} />
    ))}
  </div>
</div>

)
}

export default Home
