import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import VacancyDetailPage from './pages/VacancyDetailPage'
import toast from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'

//path - URL путь в браузере, element - компонент, который отобразится при совпадении пути
//toaster для уведомлений
const App = () => {
  return (
    <div data-theme="halloween">
      <Routes>
        <Route path = "/" element={<HomePage />} />
        <Route path = "/profile" element = {
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
        }
        />
        <Route path = "/vacancy/:id" element={<VacancyDetailPage />} /> 
      </Routes>
    </div>
  ) 
}

export default App