import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
const Pagination = ({pages, currentPage, setCurrentPage}) => {
if(pages === 1){
  return null
}
  return (
    <div className='flex items-center justify-center gap-3 mt-10'>
        <button className='disabled:opacity-50 disabled:pointer-events-none' disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}><ChevronLeft size={20} /></button>
    {Array.from({length: pages }, (_, index) => {
      if(pages>5){
        if(index === 0){
          return <button key={index} className={`w-10 h-10 flex justify-center items-center rounded-full ] text-black ${currentPage === index + 1 ? 'bg-[var(--accent)] text-white' : 'bg-[var(--light-grey)] text-[var(--primary)]'}`} onClick={() => setCurrentPage(1)}>{1}</button>
        }else if(index === pages - 1){
          return <button key={index} className={`w-10 h-10 flex justify-center items-center rounded-full ] text-black ${currentPage === index + 1 ? 'bg-[var(--accent)] text-white' : 'bg-[var(--light-grey)] text-[var(--primary)]'}`} onClick={() => setCurrentPage(pages)}>{pages}</button>
        }
        else if(index > currentPage - 3 && index < currentPage + 1){
          return <button key={index} className={`w-10 h-10 flex justify-center items-center rounded-full ] text-black ${currentPage === index + 1 ? 'bg-[var(--accent)] text-white' : 'bg-[var(--light-grey)] text-[var(--primary)]'}`} onClick={() => setCurrentPage(index+1)}>{index+1}</button>
        }
        else if((currentPage > 4 || currentPage < pages - 3) && (index === currentPage - 3 || index === currentPage + 1)){  
          return <button key={index} className='w-10 h-10 flex justify-center items-center rounded-full bg-[var(--light-grey)] text-black'>...</button>
        }
        else {
          return null
        }
      }
      else {
       return  <button key={index} className={`w-10 h-10 flex justify-center items-center rounded-full ${currentPage === index + 1 ? 'bg-[var(--accent)] text-white' : 'bg-[var(--light-grey)] text-[var(--primary)]'}`} onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>}
 } )}
        <button className='disabled:opacity-50 disabled:pointer-events-none' disabled={currentPage === pages} onClick={() => setCurrentPage(currentPage + 1)}><ChevronRight size={20} /></button>
    </div>
  )
}

export default Pagination