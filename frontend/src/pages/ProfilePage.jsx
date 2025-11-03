// pages/ProfilePage.jsx
import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Mail, User, Building, Users } from 'lucide-react'
import Navbar from '../components/Navbar'

const ProfilePage = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-base-100 rounded-xl shadow-lg p-8 mt-32">
        <h1 className="text-3xl font-bold mb-8">Мой профиль</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
              <User className="size-5 text-primary" />
              <div>
                <p className="text-sm text-base-content/60">Имя</p>
                <p className="font-semibold">{user?.name || 'Не указано'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
              <Mail className="size-5 text-primary" />
              <div>
                <p className="text-sm text-base-content/60">Email</p>
                <p className="font-semibold">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
              <Users className="size-5 text-primary" />
              <div>
                <p className="text-sm text-base-content/60">Роль</p>
                <p className="font-semibold capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {user?.role === 'student' && (
              <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
                <Building className="size-5 text-primary" />
                <div>
                  <p className="text-sm text-base-content/60">Группа</p>
                  <p className="font-semibold">{user?.group || 'Не указана'}</p>
                </div>
              </div>
            )}
            {user?.role === 'employer' && (
              <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
                <Building className="size-5 text-primary" />
                <div>
                  <p className="text-sm text-base-content/60">Компания</p>
                  <p className="font-semibold">{user?.company || 'Не указана'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage