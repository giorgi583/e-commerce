import { Plus } from 'lucide-react'
import React from 'react'
import {toast} from 'react-hot-toast'
const AddProduct = () => {
const apiURL = import.meta.env.VITE_API_URL;
const addProduct = async (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData)
  try { const response = await fetch(`${apiURL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    toast.success('Product added successfully')
  }
  else {
    throw new Error(data.message)
  } }
  catch (error) {
    toast.error(error.message)
  }
}
  return (
    <div className='max-w-7xl mx-auto py-15'>
      <h1 className='text-2xl font-bold text-[var(--accent)]'>Add Product</h1>
     
      <form className='grid grid-cols-2 gap-4 mt-5 border-2 p-10 border-[var(--light-grey)] rounded-2xl'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">
            Product Name
          </label>
          <input required type="text" />
        </div>
        <div className='flex flex-col gap-2'>
          <label  htmlFor="">
            Description
          </label>
          <input required type="text" />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">
            Original price
          </label>
          <input required type="text" />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">
            Discounted price
          </label>
          <input required type="text" />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">
            Stock
          </label>
          <input required type="text" />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">
            Quantity
          </label>
          <input required type="text" />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">
            Category
          </label>
          <input required type="text" />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">
            Brand
          </label>
          <input required type="text" />
        </div>
         <div>
        <button type='submit' className='flex items-center gap-2 py-2 px-4 rounded-lg bg-[var(--accent)] text-white'><Plus size={20} />Add</button>
      </div>
      </form>
    </div>
  )
}

export default AddProduct