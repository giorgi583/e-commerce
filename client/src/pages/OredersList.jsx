import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {toast} from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { CheckCircle, ChevronDown, ChevronUp, XCircle, XIcon } from 'lucide-react'
import placeholder from '../assets/placeholder_600x.webp'
const OredersList = () => {
      const navigate = useNavigate()
    const dispatch = useDispatch()
    const apiUrl = import.meta.env.VITE_API_URL
    const [orderItems, setOrderItems] = React.useState([])
    const { user, loading } = useSelector((state) => state.user)
    const [orderStatus, setOrderStatus] = React.useState('')
    const [updatingOrderId, setUpdatingOrderId] = React.useState(null)
    const [detailedOrder, setDetailedOrder] = React.useState('')
    const [search, setSearch] = React.useState('')
    const [orders, setOrders] = React.useState([])
    const getAllOrders = async () => {
    try {
      const token = localStorage.getItem('token')
      if(!token) return
      const response = await fetch(apiUrl + '/orders', {
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
          const response = await fetch(apiUrl + '/orders/' + id, {
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
    const updateStatus = async (id, status) => {
        const confirm = window.confirm('Are you sure you want to update this order?')
        if(!confirm) return
      const token = localStorage.getItem('token')
      if(!token) return
      try {
          const response = await fetch(apiUrl + '/orders/' + id, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({status})
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
          getAllOrders()
          console.log(data)
      } catch (error) {
          toast.error(error.message)
      }
      setOrderStatus('')
    }
  useEffect(() => {
    getAllOrders()
  },[])
  if(!user && !loading) return <Navigate to='*'/>
  return (
    <>
    <Header/>
    <div className='max-w-7xl mx-auto py-15 px-10 max-sm:px-5'>
        <h1 className='text-2xl font-bold text-[var(--accent)] mb-10'>List of all orders</h1>
        <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder='Search orders by user ID' className='mb-5'></input>
        <div className='flex flex-col gap-10'>
            {orders.length > 0 ? orders.filter((order) => search ? order.userId == search : true).map((order) => <div key={order._id} className='bg-slate-200 p-4 shadow rounded relative'> 
        <div className='flex items-start justify-between text-lg'>
          <h3 className='text-xl max-md:text-lg'>Order ID: #{order.id} <span className='ml-10 max-sm:block max-sm:ml-0'>User ID: #{order.userId}</span></h3>
          <p className='text-lg max-md:text-sm'>Created At: {order.createdAt.split('T')[0]}</p> 
        </div>
        <div className='flex items-center justify-between text-lg mt-3 gap-2'>
          <p className={`text-xl font-semibold text-[var(--secondary)] max-md:text-lg ${orderStatus && 'grow'}`}>Total Amount: ${order.totalAmount}</p>
          <p className={`text-lg font-semibold rounded absolute right-[50%] max-md:text-base top-17 max-sm:top-10 max-sm:right-15 translate-x-[50%] p-2 ${order.status === 'delivered' ? 'bg-green-100 text-green-600' : order.status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>{order.status}</p>
          <select onChange={(e) => {setOrderStatus(e.target.value); setUpdatingOrderId(order.id);}} className='text-lg font-semibold max-sm:text-base cursor-pointer text-[var(--secondary)]'>
            <option value='pending'>Pending</option>  
            <option value='processing'>Processing</option>
            <option value='shipped'>Shipped</option>
            <option value='delivered'>Delivered</option>
            <option value='cancelled'>Cancelled</option>
            <option value='refunded'>Refunded</option>
          </select>
          {updatingOrderId === order.id && <button className='text-sm font-semibold p-2 ml-3' onClick={() => updateStatus(order.id, orderStatus)}>Update Status</button> }
        </div>
        <div className='mt-5 flex items-center justify-between gap-10'>
        <button onClick={() => getOrderDetails(order.id)} className='flex items-center gap-2 mt-5 max-sm:p-1 max-sm:text-sm max-sm:gap-1'>{detailedOrder === order.id ? 'Hide Details' : 'View Details'} {detailedOrder !== order.id ? <ChevronDown/> : <ChevronUp/> }</button>
        <div>
            <p className='text-base max-md:text-sm max-sm:text-xs'>Shipping Address: {order.shippingAddress.country}, {order.shippingAddress.city}, {order.shippingAddress.street},  {order.shippingAddress.zipCode}</p>
        </div>
        </div>
        {(orderItems.length > 0 && detailedOrder === order.id) && (<div className='mt-5'>
        <h2 className='text-2xl font-semibold text-[var(--secondary)]'>Order Items</h2>
        <div className='flex flex-col gap-5 mt-5'>
        {orderItems.map((item) => (
          <div key={item.id} className='flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-2 max-sm:p-2 bg-indigo-50 py-4 px-10 rounded'>
            <div className='flex items-center gap-4'>
              <img src={placeholder} alt={item.name} className='w-20 h-20 max-sm:w-15 max-sm:h-15 object-cover'/>
              <div>
                <p className='text-lg font-semibold max-sm:text-base'>{item.productName}</p>
            <p className='text-lg font-semibold max-sm:text-base'>${item.unitPrice}</p>
              </div>
            </div>
                <p className='text-lg flex items-center gap-2'><XIcon className='w-5 h-5'/> {item.quantity}</p>
            <p className='text-lg font-semibold'>Total: ${item.subtotal}</p>
          </div>
        ))}
        </div> 
         </div> )} </div>)  : (<p className='text-2xl font-semibold text-[var(--secondary)] p-10'>No orders yet</p>)}
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default OredersList