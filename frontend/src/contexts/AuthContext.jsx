import React, {createContext, useState, useContext} from 'react'
import axios from "axios"
//context - локальное хранилище с данными об авторизации
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
// const [user, setUser] = useState({ id: '1', role: 'student' });
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:5001/api/vacancies/login', {
                email,
                password
            })

            localStorage.setItem('token', res.data.token)
            setUser({ id: res.data.userId, role: res.data.role});
            return {success: true};
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            }
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null);
    }

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: user ? true: false
    }
    
    //выдаем доступ всему приложению к value
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

