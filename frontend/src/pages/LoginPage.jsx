import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Mail, Lock, LogIn } from 'lucide-react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading } = useAuth()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(email, password)
    if (result.success) {
      navigate('/profile')
    } else {
        setError(result.message)
    }
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-md mx-auto bg-base-100 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Вход в аккаунт</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 size-5 text-base-content/50" />
              <input 
                type="email" 
                placeholder="your@email.com"
                className="input input-bordered w-full pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="••••••••"
                className="input input-bordered w-full pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
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
                <LogIn className="size-5" />
                Войти
              </>
            )}
          </button>
        </form>

        <div className="divider">или</div>
        
        <div className="text-center">
          <p className="text-base-content/60 mb-4">Нет аккаунта?</p>
          <Link to="/register" className="btn btn-outline w-full">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage