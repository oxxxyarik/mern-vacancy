import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import VacancyDetailPage from './pages/VacancyDetailPage'
import toast from 'react-hot-toast'

//path - URL путь в браузере, element - компонент, который отобразится при совпадении пути
//toaster для уведомлений
const App = () => {
  return (
    <div data-theme="sunset">
      <Routes>
        <Route path = "/" element={<HomePage />} /> 
        <Route path = "/profile" element={<ProfilePage />} /> 
        <Route path = "/vacancy/:id" element={<VacancyDetailPage />} /> 
      </Routes>
    </div>
  ) 
}

export default App