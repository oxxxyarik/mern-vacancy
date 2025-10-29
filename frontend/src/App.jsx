import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import VacancyDetailPage from './pages/VacancyDetailPage'
import toast from 'react-hot-toast'

//path - URL путь в браузере, element - компонент, который отобразится при совпадении пути
//toaster для уведомлений
const App = () => {
  return (
    <div data-theme="cmyk">
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <Routes>
        <Route path = "/" element={<HomePage />} /> 
        <Route path = "/create" element={<CreatePage />} /> 
        <Route path = "/vacancy/:id" element={<VacancyDetailPage />} /> 
      </Routes>
    </div>
  ) 
}

export default App