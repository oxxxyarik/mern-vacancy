import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Wallet, Building } from 'lucide-react'
import axios from 'axios'
import Navbar from '../components/Navbar'


const VacancyDetailPage = () => {
  // получение id из url
  const { id } = useParams()
  const [vacancy, setVacancy] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/vacancies/${id}`)
        setVacancy(res.data)
      } catch (error) {
        console.error("Error fetching vacancy:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchVacancy()
  }, [id])

  if (loading) return <div className="bg-base-200 text-center py-8">Загрузка...</div>
  if (!vacancy) return <div className="bg-base-200 text-center py-8">Вакансия не найдена</div>

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-base-100 rounded-xl shadow-lg p-8 mt-32">
        <h1 className="text-3xl font-bold mb-6">{vacancy.title}</h1>
        <div className="prose max-w-none mb-6">
          <p>{vacancy.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Building className="size-5"/>
            <span>{vacancy.employerId?.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <Wallet className="size-5"/>
            <span>{vacancy.salary} ₽</span>
          </div>
        </div>
        <button className="btn btn-primary btn-lg w-full">
          Откликнуться
        </button>
      </div>
    </div>
  )
}

export default VacancyDetailPage