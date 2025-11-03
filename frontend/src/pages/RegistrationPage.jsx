import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, UserPlus } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      await axios.post('http://localhost:5001/api/vacancies/register', formData)
      toast.success('Регистрация успешна! Войдите в аккаунт.')
      navigate('/login')
    } catch (error) {
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors
          .map(err => err.message)
          .join(', ')
        setError(validationErrors)
      } else if (error.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError('Ошибка регистрации. Попробуйте еще раз.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-md mx-auto bg-base-100 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Регистрация</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 size-5 text-base-content/50" />
              <input 
                type="email" 
                name="email"
                placeholder="your@email.com"
                className="input input-bordered w-full pl-10"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Пароль</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 size-5 text-base-content/50" />
              <input 
                type="password" 
                name="password"
                placeholder="••••••••"
                className="input input-bordered w-full pl-10"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Роль</span>
            </label>
            <select 
              name="role"
              className="select select-bordered w-full"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">Студент</option>
              <option value="employer">Работодатель</option>
            </select>
          </div>
            {error && <div className="text-error text-sm text-center">{error}</div>}
          <button 
            type="submit" 
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <UserPlus className="size-5" />
                Зарегистрироваться
              </>
            )}
          </button>
        </form>

        <div className="divider">или</div>
        
        <div className="text-center">
          <p className="text-base-content/60 mb-4">Уже есть аккаунт?</p>
          <Link to="/login" className="btn btn-outline w-full">
            Войти
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage