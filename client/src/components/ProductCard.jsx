import React from 'react'
import placeholder from '../assets/placeholder_600x.webp'
import { ShoppingCart } from 'lucide-react'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const ProductCard = ({id, name, price, oldPrice, user, quantity, getProducts}) => {
  const navigate = useNavigate()
const apiUrl = import.meta.env.VITE_API_URL;
  const deleteProduct = async (id) => {
    console.log(id);
    const token = localStorage.getItem('token');
    if (!token) return;
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;
    try {
      const response = await fetch(`${apiUrl}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
        if (response.status === 401) {
          localStorage.removeItem("token");
          dispatch(logout());
          navigate('/login');
        }
      }
      getProducts();
      toast.success(result.message);
      console.log(result);
    } catch (error) {
      toast.error(error.message);
    }
  }
  const addToCart = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const response = await fetch(`${apiUrl}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId: id, quantity: quantity })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
        if (response.status === 401) {
          localStorage.removeItem("token");
          dispatch(logout());
          toast.error('unauthorized');
        }
      }
      toast.success(result.message);
      console.log(result);
    } catch (error) {
      toast.error(error.message);
    }
  }
  const discount = Math.round(((oldPrice - price) / oldPrice) * 100)
  return (
    <div key={id} className='p-3 rounded-lg flex flex-col gap-2 items-start justify-between shadow'>
      <div className='w-full h-40 relative'>
       {price && <div className='absolute top-2 w-10 h-10 font-bold left-2 bg-red-600 text-white rounded-full text-sm -rotate-45 flex items-center justify-center'>{discount}%</div>}
        <img src={placeholder} alt="product image" className='w-full h-full' /></div>
      <div className='flex flex-col gap-2'>
        <h3 className='text-lg font-bold line-clamp-2 min-h-[3.5rem]'>{name}</h3>
        <div className='flex gap-2 items-center'>
        <p className='text-sm font-semibold text-green-800'>${price ? price : oldPrice}</p>
       {price && <delete className='text-sm text-[var(--dark-grey)] line-through'>${oldPrice}</delete>}
        </div>
      </div>
      <div className='flex gap-2 items-center'>
       {user !== 'admin' && <button onClick={() => addToCart(id)} className='bg-[var(--secondary)] text-white py-2 px-2 rounded-md'><ShoppingCart size={20}/></button>}
        <button onClick={() => navigate(`/product/${id}`)} className='bg-[var(--secondary)] text-white py-2 px-2 rounded-md grow'>Details</button>
        {user === 'admin' && <button onClick={() => navigate(`/edit-product/${id}`)} className='bg-[var(--secondary)] text-white py-2 px-2 rounded-md '>Edit</button>}
        {user === 'admin' && <button onClick={() => deleteProduct(id)} className='bg-[var(--secondary)] text-white py-2 px-2 rounded-md '>Delete</button>}
      </div>
    </div>
  )
}

export default ProductCard