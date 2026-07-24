import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const AccessDenied = () => {
  return (
    <div className='flex items-center gap-10 flex-col justify-center h-screen text-4xl font-bold text-[var(--secondary)]'>
        <h1>Oops! Error 403</h1>
        <h1>You are not allowed to access this page</h1>
        <p>Access Denied!</p>
        <NavLink className='flex items-center gap-2 bg-amber-400 p-4 rounded-full' to='/'><ArrowLeft className='inline mr-2 size-10'/>Go Back</NavLink>
    </div>
  )
}

export default AccessDenied