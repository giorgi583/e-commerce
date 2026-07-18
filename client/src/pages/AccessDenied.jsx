import React from 'react'

const AccessDenied = () => {
  return (
    <div className='flex items-center gap-10 flex-col justify-center h-screen text-5xl font-bold text-[var(--secondary)]'>
        <h1>Oops! Error 403</h1>
        <h1>You are not allowed to access this page</h1>

        <p>Access Denied!</p>
    </div>
  )
}

export default AccessDenied