import { PenSquareIcon } from 'lucide-react'
import React from 'react'
import {Link} from "react-router"
import { formatDate } from '../lib/utils'

const VacancyCard = ({vacancy}) => {
  return <Link to = {'/vacancy/${vacancy._id}'}
  className="card bg-base-200 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[ff2f2f]">
        <div className="card-body">
            <h3 className = "card-title text-base-content">{vacancy.title}</h3>
            <p className='text-base-content/70 line-clamp-3'>{vacancy.description}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">
                    {formatDate(new Date(vacancy.createdAt))}
                </span>
            </div>
        </div>
  </Link>
  
}

export default VacancyCard