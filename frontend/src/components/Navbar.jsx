import { HatGlasses, ContactRound } from 'lucide-react'
import { Link } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-base-300 border-b border-base-content/10">
            <div className="mx-auto max-w-7xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>
                        StudWork
                    </h1>
                    <div className='flex items-center gap-4'>
                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link to={"/profile"} className="btn btn-primary">
                                    <ContactRound className="size-5"/>
                                    <span className='font-bold'>My Profile</span>
                                </Link>
                                <button onClick={logout} className="btn btn-outline">Выйти</button>
                            </div>
                        ) : (
                            <Link to={"/login"} className="btn btn-primary">
                                <HatGlasses className="size-5"/>
                                <span className='font-bold'>Войти</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar