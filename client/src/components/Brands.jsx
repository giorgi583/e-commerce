import React from 'react'
import logos from '../assets/images'
const Brands = () => {
  return (
    <div className='max-w-7xl mx-auto py-15 overflow-x-hidden relative'>
        <h1 className='text-2xl font-bold text-[var(--accent)] mb-10'>Brands</h1>
        <div className='flex items-center gap-20 min-h-40 animate-[slide_15s_linear_infinite_alternate] hover:[animation-play-state:paused]'>
            {logos.map((logo) => (
                <div key={logo} className=' w-40 h-30 shrink-0'>
                    <img className='w-full' src={logo} alt="logo" />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Brands