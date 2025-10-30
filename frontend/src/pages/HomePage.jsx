import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import { useState } from "react"
import { useEffect } from 'react';
import axios from "axios"
import toast from "react-hot-toast"
import VacancyCard from '../components/VacancyCard';

const HomePage = () => {
const [isRateLimited, setIsRateLimited] = useState(false);
const [vacancies, setVacancies] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
    const fetchVacancies = async () => {
        try {
            //get запрос на бэк
            const res = await axios.get("http://localhost:5001/api/vacancies")
            setVacancies(res.data)
            setIsRateLimited(false)
            console.log(res.data);
        } catch (error) {
            console.log("Error fetching vacancies")
            if (error.response?.status === 429)
            {
                setIsRateLimited(true)
            }
            else 
            {
                toast.error("failed to load vacancies")
            }
        }
        finally {
            setLoading(false)
        }
    }

    fetchVacancies();
}, [])

  return (
    <div className="min-h-screen">
        <Navbar />
        {(isRateLimited) && <RateLimitedUI/>}

        <div className="max-w-7xl mx-auto p-4 mt-6">
            {loading && <div className="text-center text-primary py-10">Loading vacancies...</div>}

            {vacancies.length > 0 && !isRateLimited && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vacancies.map((vacancy) => (
                        <VacancyCard key={vacancy._id} vacancy = {vacancy}/>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default HomePage