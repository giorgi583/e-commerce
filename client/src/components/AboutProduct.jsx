import React from 'react'
import placeholder from '../assets/placeholder_600x.webp'
import { LucideArrowUpNarrowWide, ShoppingCart } from 'lucide-react'
const AboutProduct = ({product}) => {
  return (
   product && <div id='aboutProduct' className='p-5 px-3 rounded-3xl text-gray-600 font-semibold w-full'>
  <div className='flex gap-20 mb-5 p-2 px-3'>
 <div className='grid grid-cols-5 gap-3'>
   <div className='max-w-108 col-span-5'>
    <img src={placeholder} alt={product.name} />
   </div>
   <div className='flex gap-2 col-span-5'>
     <div className='max-w-20'><img src={placeholder} alt="images" /></div>
     <div className='max-w-20'><img src={placeholder} alt="images" /></div>
     <div className='max-w-20'><img src={placeholder} alt="images" /></div>
     <div className='max-w-20'><img src={placeholder} alt="images" /></div>
     <div className='max-w-20'><img src={placeholder} alt="images" /></div>
   </div>
 </div>
 <div className='flex flex-col gap-3 justify-between grow'>
  <h2 className='text-2xl font-bold text-[var(--secondary)]'>{product.name}</h2>
  <div className='flex flex-col items-center gap-4 border border-gray-300 rounded-3xl p-5'>
    <p className='flex items-center justify-between w-full'>Brand: <span className='font-bold'>{product.brand}</span></p>
     <p className='flex items-center justify-between w-full'>Category: <span className='font-bold'>{product.category}</span></p>
      <p className='flex items-center justify-between w-full'>Quantity: <span className='font-bold'>{product.quantity}</span></p>
       <p className='flex items-center justify-between w-full'>Left in stock: <span className='font-bold'>{product.stock}</span></p>
  </div>
  <div className='flex flex-col gap-4 border border-gray-300 rounded-3xl p-5'>
  <h2 className='text-2xl font-bold text-[var(--secondary)]'>Description</h2>
  <p className='text-sm'>{product.description}</p>
  </div>
  <div className='flex flex-col gap-4 border border-gray-300 rounded-3xl p-5'>
  <div className='flex justify-between items-center border-b border-gray-300 p-3'>
  <div className='flex flex-col items-center'>
    <p className='text-2xl font-bold'>${product.discountedPrice || product.price}</p>
   { product.discountedPrice && <p className='line-through text-sm text-gray-500'>${product.price}</p>}
  </div>
  <div>
    <button className='text-2xl py-2 px-5 rounded-full'>Buy</button>
  </div>
  </div>
  <div className='flex gap-10 items-center'>
    <button className='text-xl py-2 px-5 rounded-full flex items-center'><ShoppingCart className='inline mr-2 size-5'/> Add to cart</button>
    <button className='text-xl py-2 px-5 rounded-full flex items-center'><LucideArrowUpNarrowWide className='inline mr-2 size-5'/> Compare</button>
  </div>
  </div>
  </div>
  </div>
    </div>
  )
}

export default AboutProduct