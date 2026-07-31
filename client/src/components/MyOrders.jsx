import React, { useEffect } from 'react'
import {toast } from 'react-hot-toast'
import {CheckCircleIcon, ChevronDown, ChevronUp, Trash, XCircleIcon} from 'lucide-react'
import placeholder from '../assets/placeholder_600x.webp'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
const MyOrders = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const apiUrl = import.meta.env.VITE_API_URL
const [orderType, setOrderType] = React.useState('all')
const [orderItems, setOrderItems] = React.useState([])
const [detailedOrder, setDetailedOrder] = React.useState('')
const [orders, setOrders] = React.useState([])
const getMyOrders = async () => {
    try {
      const token = localStorage.getItem('token')
      if(!token) return
      const response = await fetch(apiUrl + '/orders/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if(!response.ok) {
          if (response.status === 401) {
              localStorage.removeItem("token");
              toast.error('unauthorized')
              dispatch(logout())
              navigate('/login')
            }
            throw new Error(data.message)
      }
      setOrders(data.orders)
      console.log(data)
    }
    catch (error) {
      console.log(error)
    }
  }
  const getOrderDetails = async (id) => {
    const token = localStorage.getItem('token')
    if(!token) return
    try {
        const response = await fetch(apiUrl + '/orders/me/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        if(!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem("token");
                toast.error('unauthorized')
                dispatch(logout())
                navigate('/login')
            }
            throw new Error(data.message)
        }
        setDetailedOrder(prev => prev === id ? '' : id)
        setOrderItems(data.orderItems)
        console.log(data)
    } catch (error) {
        toast.error(error.message)
    }
  }
  const cancelOrder = async (id) => {
    const confirm = window.confirm('Are you sure you want to cancel this order?')
    if(!confirm) return
    const cancelReason = window.prompt('Please enter the reason for canceling the order')
    if(!cancelReason) return
    const token = localStorage.getItem('token')
    if(!token) return
    try {
        const response = await fetch(apiUrl + '/orders/' + id + '/cancelOrder', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({cancelReason})
        })
        const data = await response.json()
        if(!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem("token");
                toast.error('unauthorized')
                dispatch(logout())
                navigate('/login')
            }
            throw new Error(data.message)
        }
        toast.success(data.message)
        getMyOrders()
        console.log(data)
    } catch (error) {
        toast.error(error.message)
    }
  }
useEffect(() => {
    getMyOrders()
},[])
  return (
    <div className='max-w-7xl mx-auto py-15 flex-col gap-10 relative'>
          <h2 className='text-2xl font-bold text-[var(--accent)] my-10'>Orders</h2>
        <div className='flex items-center sticky top-0 z-10 mb-10'>
            <p onClick={() => setOrderType('all')} className={`px-2 py-1 cursor-pointer  ${orderType === 'all' ? 'border-b-3 border-[var(--secondary)] bg-indigo-50' : ''}`}>All orders</p>
            <p onClick={() => setOrderType('uncompleted')} className={`px-2 py-1 cursor-pointer  ${orderType === "uncompleted" ? 'border-b-3 border-[var(--secondary)] bg-indigo-50' : ''}`}>uncompleted</p>
            <p onClick={() => setOrderType('completed')} className={`px-2 py-1 cursor-pointer  ${orderType === "completed" ? 'border-b-3 border-[var(--secondary)] bg-indigo-50' : ''}`}>completed</p>
            <p onClick={() => setOrderType('cancelled')} className={`px-2 py-1 cursor-pointer  ${orderType === "cancelled" ? 'border-b-3 border-[var(--secondary)] bg-indigo-50' : ''}`}>cancelled</p>
        </div>
        <div className='flex flex-col gap-5'  >
        {orders.length > 0 ? orders.filter((order) => {
            if(orderType === 'all') return true
            if(orderType === 'uncompleted') return order.status !== 'delivered' && order.status !== 'cancelled' && order.status !== 'refunded'
            if(orderType === 'completed') return order.status === 'delivered'
            if(orderType === 'cancelled') return order.status === 'cancelled' || order.status === 'refunded'}).map((order) => <div key={order._id} className='bg-slate-100 p-4 shadow rounded relative'> 
        <div className='flex items-center justify-between text-lg'>
          <h3>Order ID: #{order.id} <span className='text-[var(--secondary)] text-2xl font-bold ml-5'>{order.notes || ''}</span></h3>
          <p>Created At: {order.createdAt.split('T')[0]}</p>
        </div>
        <div className='flex items-center justify-between text-lg mt-3'>
          <p className='text-xl font-semibold text-[var(--secondary)]'>Total Amount: ${order.totalAmount}</p>
           <p className={`text-lg font-semibold rounded absolute right-[50%] top-[50%] translate-x-[50%] translate-y-[-50%] p-1 px-4 ${order.status === 'delivered' ? 'bg-green-200 text-green-600' : order.status === 'cancelled' ? 'bg-red-200 text-red-600' : 'bg-yellow-200 text-yellow-600'}`}>{order.status}</p>
        </div>
        <div className='flex items-center justify-between'>
        <button onClick={() => getOrderDetails(order.id)} className='flex items-center gap-2 mt-5'>{detailedOrder === order.id ? 'Hide Details' : 'View Details'} {detailedOrder !== order.id ? <ChevronDown/> : <ChevronUp/> }</button>
        <button onClick={() => cancelOrder(order.id)} className='flex items-center bg-white gap-2 mt-5 text-red-500'>Cancel Order <XCircleIcon/></button>
        </div>
        {(orderItems.length > 0 && detailedOrder === order.id) && (<div className='mt-5'>
        <h2 className='text-2xl font-semibold text-[var(--secondary)]'>Order Items</h2>
        <div className='flex flex-col gap-5 mt-5'>
        {orderItems.map((item) => (
          <div key={item.id} className='flex items-center justify-between bg-indigo-50 py-4 px-10 rounded'>
            <div className='flex items-center gap-4'>
              <img src={placeholder} alt={item.name} className='w-20 h-20 object-cover'/>
              <div>
                <p className='text-lg font-semibold'>{item.productName}</p>
            <p className='text-lg font-semibold'>${item.unitPrice}</p>
              </div>
            </div>
                <p className='text-lg'>X {item.quantity}</p>
            <p className='text-lg font-semibold'>Total: ${item.subtotal}</p>
          </div>
        ))}
        </div> 
         </div> )} </div>)  : (<p className='text-2xl font-semibold text-[var(--secondary)] p-10'>No orders yet</p>)}
        </div>
    </div>
    
  )
}

export default MyOrders