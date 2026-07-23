import React, { useEffect, useState } from 'react'
import { useParams, NavLink, Navigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { ChevronRight, Home, Pencil, Shirt } from 'lucide-react';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
const EditProducts = () => {
    const apiURL = import.meta.env.VITE_API_URL;
    const [product, setProduct] = useState({});
const {productId} = useParams()
const {user, loading} = useSelector(state => state.user)
const getProduct = async () => {
    const response = await fetch(`${apiURL}/products/${productId}`);
    const result = await response.json();
    setProduct(result.product);
    console.log(result);
}
useEffect(() => {
    getProduct();
}, [])

const updateProduct = async () => {
    if(!product.name || !product.price || !product.category || !product.description || !product.stock || !product.brand || !product.quantity){
        toast.error('Please fill required fields');
        return
    }
    if(product.price < product.discountedPrice) {
        toast.error('Discounted price cannot be greater than the original price');
        return
    }
    const token = localStorage.getItem('token');
    if (!token) return;
   try{ const response = await fetch(`${apiURL}/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message);
        if (response.status === 401) {
            localStorage.removeItem("token");
            toast.error('unauthorized');
            dispatch(logout());
            navigate('/login');
        }
    }
    toast.success(result.message);
    console.log(result); }
    catch(error) {
        console.log(error.message);
        toast.error(error.message)
    }
}
console.log(typeof product.price)
if (!user && !loading) {
    return <Navigate to='/login'/>
}
if(loading) return <Loader />
  return (
  product &&  <div className='max-w-7xl mx-auto py-15'>
    <div className='flex items-center gap-2 mb-5 p-2 px-3 rounded-full bg-gray-200 text-gray-600 font-semibold max-w-fit'>
        <NavLink to='/' className='flex items-center gap-2 hover:text-[var(--accent)]'> <Home size={20} /> Home</NavLink>
        <span><ChevronRight size={20} /></span>
        <NavLink to='/admin/products' className='flex hover:text-[var(--accent)] items-center gap-2'><Shirt size={20} /> Products</NavLink>
        <span><ChevronRight size={20} /></span>
        <span className='text-[var(--accent)] flex items-center gap-2'><Pencil size={20} /> Edit Product</span>
      </div>
      <h1 className='text-2xl font-bold text-[var(--accent)] mb-10'>Edit Product</h1>
      <div className='grid grid-cols-2 gap-4 mt-5 border-2 p-10 border-[var(--light-grey)] rounded-2xl'>
      <div className='flex flex-col'>
        <label htmlFor="">Product Name</label>
        <input type="text" value={product?.name} onChange={(e)=> setProduct({...product, name: e.target.value})}/>
      </div>
      <div className='flex flex-col'>
        <label htmlFor="">Product Price</label>
        <input type="number" value={Number(product?.price)} onChange={(e)=> setProduct({...product, price: Number(e.target.value)})}/>
      </div>
      <div className='flex flex-col'>
        <label htmlFor="">Discounted Price</label>
        <input type="number" value={Number(product?.discountedPrice)} onChange={(e)=> setProduct({...product, discountedPrice: Number(e.target.value)})}/>
      </div>
      <div className='flex flex-col'> 
        <label htmlFor="">Category</label>
        <input type="text" value={product?.category} onChange={(e)=> setProduct({...product, category: e.target.value})}/>
      </div>
      <div className='flex flex-col'>
        <label htmlFor="">Description</label>
        <input type="text" value={product?.description} onChange={(e)=> setProduct({...product, description: e.target.value})}/>
      </div>
      <div className='flex flex-col'>
        <label htmlFor="">Stock</label>
        <input type="number" value={Number(product?.stock)} onChange={(e)=> setProduct({...product, stock: Number(e.target.value)})}/>
      </div>
      <div className='flex flex-col'>
        <label htmlFor="">Quantity</label>
        <input type="number" value={Number(product?.quantity)} onChange={(e)=> setProduct({...product, quantity: Number(e.target.value)})}/>
      </div>
      <div className='flex flex-col'>
        <label htmlFor="">Rating</label>
        <input type="number" value={Number(product?.rating)} onChange={(e)=> setProduct({...product, rating: Number(e.target.value)})}/>   
      </div>
      <div className='flex flex-col'>
        <label htmlFor="">Brand</label>
        <input type="text" value={product?.brand} onChange={(e)=> setProduct({...product, brand: e.target.value})}/>   
      </div>
      <div>
      </div>
        <button className='bg-[var(--accent)] text-white p-2 rounded-lg' onClick={updateProduct}>Update Product</button>
    </div>
    </div>
  )
}

export default EditProducts