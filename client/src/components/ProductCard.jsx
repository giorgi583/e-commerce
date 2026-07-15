import React from 'react'
import placeholder from '../assets/placeholder_600x.webp'
import { ShoppingCart } from 'lucide-react'
const ProductCard = () => {
  return (
    <div className='p-3 rounded-lg flex flex-col gap-2 items-start justify-center shadow'>
      <div className='w-full h-40 relative'>
        <div className='absolute top-2 w-10 h-10 font-bold left-2 bg-red-600 text-white rounded-full text-sm -rotate-45 flex items-center justify-center'>40%</div>
        <img src={placeholder} alt="product image" className='w-full h-full' /></div>
      <div className='flex flex-col gap-2'>
        <h3 className='text-lg font-bold '>Product Name</h3>
        <div className='flex gap-2 items-center'>
        <p className='text-sm font-semibold'>Price</p>
        <delete className='text-sm text-[var(--dark-grey)] line-through'>Old price</delete>
        </div>
      </div>
      <div className='flex gap-2 items-center'>
        <button className='bg-[var(--secondary)] text-white py-2 px-4 rounded-md'><ShoppingCart size={20}/></button>
        <button className='bg-[var(--secondary)] text-white py-2 px-4 rounded-md grow'>Details</button>
      </div>
    </div>
  )
}

export default ProductCard