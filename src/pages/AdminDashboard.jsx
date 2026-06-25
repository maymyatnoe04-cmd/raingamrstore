import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { Navigate } from 'react-router-dom'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'

const AdminDashboard = () => {
  const { user, loading } = useAuth()
  const [userCount, setUserCount] = useState(0)

  useEffect(() => {
    const loadUsers = async () => {
      const snapshot = await getDocs(collection(db, 'users'))
      setUserCount(snapshot.size)
    }

    loadUsers()
  }, [])

  if (loading) return <div className="p-8">Loading...</div>

  if (!user || user.email !== 'admin@raingamestore.com') {
    return <Navigate to="/" replace />
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2>Total Users</h2>
          <p className="text-3xl font-bold">{userCount}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2>Orders</h2>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2>Revenue</h2>
          <p className="text-3xl font-bold">$0</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
