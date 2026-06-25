import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0)

  useEffect(() => {
    const loadUsers = async () => {
      const snapshot = await getDocs(collection(db, 'users'))
      setUserCount(snapshot.size)
    }

    loadUsers()
  }, [])

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
