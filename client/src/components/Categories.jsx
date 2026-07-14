import { Accessibility, Computer, Ellipsis, Headphones, Lamp, Smartphone, Shirt, Table2, Diamond, Watch } from 'lucide-react'
import React from 'react'

const Categories = () => {
  return (
    <div className='max-w-7xl mx-auto py-15'>
    <h1 className='text-2xl font-bold text-[var(--accent)] mb-10'>Categories</h1>
    <div className='grid grid-cols-4 gap-4  max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1'>
        <div className='p-3 rounded-lg flex flex-col bg-amber-100 items-center justify-center py-5 text-[var(--secondary)] hover:scale-105 cursor-pointer hover:bg-[var(--accent)] transition-all duration-300'><Ellipsis size={30}/> All</div>
        <div className='p-3 rounded-lg flex flex-col bg-amber-100 items-center justify-center py-5 text-[var(--secondary)] hover:scale-105 cursor-pointer hover:bg-[var(--accent)] transition-all duration-300'><Headphones size={30}/> Headphones</div>
        <div className='p-3 rounded-lg flex flex-col bg-amber-100 items-center justify-center py-5 text-[var(--secondary)] hover:scale-105 cursor-pointer hover:bg-[var(--accent)] transition-all duration-300'><Shirt size={30}/> Clothing</div>
        <div className='p-3 rounded-lg flex flex-col bg-amber-100 items-center justify-center py-5 text-[var(--secondary)] hover:scale-105 cursor-pointer hover:bg-[var(--accent)] transition-all duration-300'><Computer size={30}/> Computers</div>
        <div className='p-3 rounded-lg flex flex-col bg-amber-100 items-center justify-center py-5 text-[var(--secondary)] hover:scale-105 cursor-pointer hover:bg-[var(--accent)] transition-all duration-300'><Watch size={30}/> Accessories</div>
        <div className='p-3 rounded-lg flex flex-col bg-amber-100 items-center justify-center py-5 text-[var(--secondary)] hover:scale-105 cursor-pointer hover:bg-[var(--accent)] transition-all duration-300'><Lamp size={30}/> Furniture</div>
        <div className='p-3 rounded-lg flex flex-col bg-amber-100 items-center justify-center py-5 text-[var(--secondary)] hover:scale-105 cursor-pointer hover:bg-[var(--accent)] transition-all duration-300'><Smartphone size={30}/> Smartphones</div>
        <div className='p-3 rounded-lg flex flex-col bg-amber-100 items-center justify-center py-5 text-[var(--secondary)] hover:scale-105 cursor-pointer hover:bg-[var(--accent)] transition-all duration-300'><Diamond size={30}/> Jewelry</div>
    </div>
    </div>
  )
}

export default Categories