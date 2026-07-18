import { ChevronRight, Home, Plus, Shirt } from 'lucide-react'
import React from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import {useSelector} from 'react-redux'
const AddProduct = () => {
const apiURL = import.meta.env.VITE_API_URL;
const user = useSelector(state => state.user)
const addProduct = async (e) => {
  const token = localStorage.getItem('token')
  if(!token) return
  e.preventDefault()
  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData)
  data.price = Number(data.price)
  data.discountedPrice = Number(data.discountedPrice)
  data.stock = Number(data.stock)
  data.quantity = Number(data.quantity)
  console.log(data)
  try { const response = await fetch(`${apiURL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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
    console.log(error)
    toast.error(error.message)
  }
}
if(!user.user) return <Navigate to='/login' />
  return (
    <div className='max-w-7xl mx-auto py-15'>
      <div className='flex items-center gap-2 mb-5 p-2 px-3 rounded-full bg-gray-200 text-gray-600 font-semibold max-w-fit'>
        <NavLink to='/' className='flex items-center gap-2 hover:text-[var(--accent)]'> <Home size={20} /> Home</NavLink>
        <span><ChevronRight size={20} /></span>
        <NavLink to='/admin/products' className='flex hover:text-[var(--accent)] items-center gap-2'><Shirt size={20} /> Products</NavLink>
        <span><ChevronRight size={20} /></span>
        <span className='text-[var(--accent)] flex items-center gap-2'><Plus size={20} /> Add Product</span>
      </div>
      <h1 className='text-2xl font-bold text-[var(--accent)]'>Add Product</h1>
     
      <form onSubmit={addProduct} className='grid grid-cols-2 gap-4 mt-5 border-2 p-10 border-[var(--light-grey)] rounded-2xl'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">
            Product Name
          </label>
          <input name='name' required type="text" />
        </div>
        <div className='flex flex-col gap-2'>
          <label  htmlFor="">
            Description
          </label>
          <input name='description' required type="text" />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">
            Original price
          </label>
          <input name='price' required type="number" />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">
            Discounted price
          </label>
          <input name='discountedPrice' required type="number" />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">
            Stock
          </label>
          <input name='stock' required type="number" />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">
            Quantity
          </label>
          <input name='quantity' required type="number" />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">
            Category
          </label>
          <input name='category' required type="text" />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="">
            Brand
          </label>
          <input name='brand' required type="text" />
        </div>
         <div>
        <button type='submit'  className='flex items-center gap-2 py-2 px-4 rounded-lg bg-[var(--accent)] text-white'><Plus size={20} />Add</button>
      </div>
      </form>
    </div>
  )
}

export default AddProduct