import React, { useEffect } from 'react'
import {toast } from 'react-hot-toast'
const MyOrders = () => {
    const apiUrl = import.meta.env.VITE_API_URL
const [orderType, setOrderType] = React.useState('all')
const [orders, setOrders] = React.useState([])
const getMyOrders = async () => {
    const token = localStorage.getItem('token') 
    if(!token) return
    try {
        const response = await fetch(apiUrl + '/orders/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        if(!response.ok) {
            throw new Error(data.message)
            if (response.status === 401) {
                localStorage.removeItem("token");
                
            }
        }
        setOrders(data.data)
    } catch (error) {
        console.log(error)
    }
}
useEffect(() => {
    getMyOrders()
},[])
  return (
    <div className='max-w-7xl mx-auto py-15 flex gap-10 relative'>
        <div className='flex items-center sticky top-0 z-10'>
            <p onClick={setOrderType('all')} className='px-2 py-1'>All orders</p>
            <p onClick={setOrderType('uncompleted')} className='px-2 py-1'>pending</p>
            <p onClick={setOrderType('completed')} className='px-2 py-1'>completed</p>
            <p onClick={setOrderType('cancelled')} className='px-2 py-1'>cancelled</p>
        </div>
    </div>
  )
}

export default MyOrders