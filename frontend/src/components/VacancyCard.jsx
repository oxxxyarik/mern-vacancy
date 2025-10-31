import { CircleDashed, SquareDashed, TriangleDashed } from 'lucide-react'
import {Link} from "react-router-dom"
import { formatDate } from '../lib/utils'

const VacancyCard = ({vacancy}) => {
  return <Link to = {`/vacancy/${vacancy._id}`}
  className="card bg-base-200 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[ff2f2f] h-80">
        <div className="card-body flex flex-col gap-10">
            <h3 className="card-title text-base-content gap-2 flex items-center">
                <CircleDashed className="size-5"/> 
                {vacancy.title}
            </h3>
            <p className='text-base-content/70 line-clamp-3 flex items-center gap-2'>
                <SquareDashed className="size-5 text-base-content"/>{vacancy.description}
            </p>
            <p className='text-base-content/70 line-clamp-3 flex items-center gap-2'>
                <TriangleDashed className="size-5 text-base-content"/>{vacancy.employerId?.company || vacancy.employerId?.name} • {vacancy.salary} ₽
            </p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">
                    {formatDate(new Date(vacancy.createdAt))}
                </span>
            </div>
        </div>
  </Link>
}

export default VacancyCard