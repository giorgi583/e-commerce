import React, { useState, useEffect } from 'react'
import {toast} from 'react-hot-toast'
import {ChevronRight, Home, Minus, Plus, ProjectorIcon, ShieldCheck, ShoppingCart, Trash2, XIcon} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import placeholder from '../assets/placeholder_600x.webp'
import Loader from '../components/Loader'
const Cart = () => {
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL
  const [cartItems, setCartItems] = useState([])
  const [adressOpen, setAdressOpen] = useState(false)
  const [adress, setAdress] = useState({street: '', city: '', state: '', country: '', zipCode: ''})
  const [orderNote, setOrderNote] = useState('')
  const [paymentWindowOpen, setPaymentWindowOpen] = useState(false)
  const getCartItems = async () => {
    const token = localStorage.getItem('token')
    if(!token) return
    try {
      const response = await fetch(apiUrl + '/cart', {
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
  }
  throw new Error(data.message)
}
setCartItems(data.cartItems)
console.log(data)
}
catch (error) {
      console.log(error)
    }
  }
  const updateQuantity = async (id, quantity) => {
    const token = localStorage.getItem('token')
    if(!token) return
    try {
      const response = await fetch(apiUrl + '/cart/' + id, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({quantity})
})
const data = await response.json()
if(!response.ok) {
  if (response.status === 401) {
    localStorage.removeItem("token");
    toast.error('unauthorized')
  }
  throw new Error(data.message)
}
getCartItems()
console.log(data)
    }
    catch (error) {
    }
  }
const deleteItem = async (id) => {
  const token = localStorage.getItem('token')
  if(!token) return
  try {
const response = await fetch(apiUrl + '/cart/' + id, {
  method: 'DELETE',
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
  }
  throw new Error(data.message)
}
toast.success(data.message)
getCartItems()
console.log(data)
}
    catch (error) {
      toast.error(error.message)
    }
}
const clearCart = async () => {
  const confirm = window.confirm('Are you sure you want to clear your cart?')
  if(!confirm) return
  const token = localStorage.getItem('token')
  if(!token) return
  try {
const response = await fetch(apiUrl + '/cart', {
  method: 'DELETE',
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
  }
  throw new Error(data.message)
}
toast.success(data.message)
getCartItems()
console.log(data)
}
catch (error) {
  toast.error(error.message)
}
}
const makeOrder = async () => {
  if(!adress.state || !adress.street || !adress.city || !adress.country || !adress.zipCode) {
    toast.error('Please enter your shipping address')
    return }
  const confirm = window.confirm('Are you sure you want to place this order?')
  if(!confirm) return
  const token = localStorage.getItem('token')
  if(!token) return
  try {
    const response = await fetch(apiUrl + '/orders', {
      method: 'POST',
      body: JSON.stringify({shippingAddress: adress, notes: orderNote}),
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
  }
  throw new Error(data.message)
}
toast.success(data.message)
getCartItems()
console.log(data)
    }
    catch (error) {
      toast.error(error.message)
    }
  setPaymentWindowOpen(false)
}
useEffect(() => {
  getCartItems()
}, [])
const {user, loading} = useSelector(state => state.user)
useEffect(() => {
 if(!user && !loading) navigate('/login')
}, [user, loading, navigate])
console.log(user)
if(loading) return <Loader />
  return (
    <>
    <Header cartItems={cartItems?.length}/>
    <div className='max-w-7xl mx-auto py-15 px-10 overflow-x-hidden relative'>
      <div className='flex items-center gap-2 mb-5 p-2 px-3 rounded-full bg-gray-200 text-gray-600 font-semibold max-w-fit'>
        <NavLink to='/' className='flex items-center gap-2 hover:text-[var(--accent)]'> <Home size={20} /> Home</NavLink>
        <span><ChevronRight size={20} /></span>
        <span className='text-[var(--accent)] flex items-center gap-2'><ShoppingCart size={20} /> Cart</span>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-[var(--accent)] mb-10'>My Cart ({cartItems.length})</h1>
       {cartItems.length > 0 && <button onClick={clearCart} className='bg-[var(--accent)] text-white py-2 px-5 rounded-full'>Clear Cart</button>}
      </div>
      <div className='flex flex-col gap-10'>
       {cartItems.length > 0 ? cartItems.map((item, index) => (
         <div key={index} className='w-full h-30 flex border border-gray-300 items-center rounded-2xl p-3 relative'>
          <div className='max-w-25 h-full border border-gray-300 p-1'> <img className='w-full h-full' src={placeholder} alt="picture" /> </div>
          <div className='flex flex-col gap-2 ml-5'> <h3 className='font-semibold text-2xl'>{item.product.name}</h3> 
          <div className='flex items-center gap-5'> <p>Unit Price: ${item.unitPrice}</p> 
               <p>Quantity: {item.quantity}</p> <button onClick={() => {updateQuantity(item.product.id, item.quantity+1)}} className='bg-gray-100 w-6 h-6 rounded-full text-black border border-gray-300 p-0 m-0 flex items-center justify-center'><Plus size={12} /></button>
               <button onClick={() => {updateQuantity(item.product.id, item.quantity-1)}} className='bg-gray-100 w-6 h-6 rounded-full text-black border border-gray-300 p-0 m-0 flex items-center justify-center'><Minus size={12} /></button> </div></div>
         <button onClick={()=> deleteItem(item.product.id)} className='absolute top-10 right-5'><Trash2 size={20} /></button>
         </div>
       )): <div className='flex flex-col items-center justify-center text-3xl gap-20'> 
       <h1 className='font-semibold text-[var(--secondary)]'>Your Cart is Empty!</h1>
        <p className='text-gray-600 text-xl mb-20'>Please go to <span onClick={() => navigate('/products')} className='cursor-pointer text-[var(--accent)]'>products page</span> to add products to your cart</p>
        </div>}
      </div>
     {cartItems.length > 0 && <div className='flex flex-col mt-10 '>
        <h1 className='text-3xl font-bold text-[var(--accent)] mb-10'>Order Summary</h1>
        <div className='flex flex-col gap-5 '>
          <div className='flex items-center justify-between border-b border-gray-300 pb-5 gap-10'>
            <p className='text-lg font-semibold'>Subtotal</p>
            <p className='text-lg font-semibold'>${cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0).toFixed(2)}</p>
          </div>
          <div className='flex items-center justify-between border-b border-gray-300 pb-5'>
            <p className='text-lg font-semibold'>Shipping</p>
            <p className='text-lg font-semibold'>Free</p>
          </div>
          <div className='flex items-center justify-between border-b border-gray-300 pb-5'>
            <p className='text-lg font-semibold'>Total</p>
            <p className='text-lg font-semibold'>${cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0).toFixed(2)}</p>
          </div>
      </div>
    <button onClick={() => {setPaymentWindowOpen(true); setAdressOpen(true)}} className='bg-[var(--accent)] text-white font-bold text-2xl py-2 px-5 rounded-full mt-20'>Checkout</button>
    </div>}
    </div>
    {paymentWindowOpen && <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white p-5 rounded-2xl relative min-w-100 overflow-hidden'>
        <h4 className='text-2xl font-semibold mb-5 flex items-center gap-2'>Payment <ShieldCheck size={24} fill='lightgreen' /></h4>
        <button className='absolute top-5 right-5 bg-red-600 p-2 rounded-full' onClick={() => setPaymentWindowOpen(false)}><XIcon size={20} /></button>
        <div className={`flex w-full relative ${adressOpen ? 'min-h-150' : 'min-h-80'}`}>
        <div className={`flex flex-col gap-5 ${adressOpen ? 'translate-x-0' : '-translate-x-[170%]'} w-full absolute transition-all duration-300`}> 
          <p className='text-lg font-semibold'>Shipping Address</p>
          <div className='flex flex-col gap-2'>
            <label htmlFor="street">Street*</label>
            <input type="text" name="street" id="street" value={adress.street} onChange={e => setAdress({...adress, street: e.target.value})} />
          </div>
           <div className='flex flex-col gap-2'>
            <label htmlFor="city">City*</label>
            <input type="text" name="city" id="city" value={adress.city} onChange={e => setAdress({...adress, city: e.target.value})} />
          </div>
           <div className='flex flex-col gap-2'>
            <label htmlFor="state">State*</label>
            <input type="text" name="state" id="state" value={adress.state} onChange={e => setAdress({...adress, state: e.target.value})} />
          </div>
           <div className='flex flex-col gap-2'>
            <label htmlFor="country">Country*</label>
            <input type="text" name="country" id="country" value={adress.country} onChange={e => setAdress({...adress, country: e.target.value})} />
          </div>
           <div className='flex flex-col gap-2'>
            <label htmlFor="zip">Zip code*</label>
            <input type="text" name="zip" id="zip" value={adress.zipCode} onChange={e => setAdress({...adress, zipCode: e.target.value})} />
          </div>
         <button onClick={() => setAdressOpen(false)}>continue</button>
        </div>
         <div className={`flex flex-col justify-between gap-5 w-full ${adressOpen ? 'translate-x-[170%]' : 'translate-x-0'} absolute transition-all duration-300 bg-white `}>
        <p className='mb-10 text-2xl mt-10'>Payment for total: <span className='font-semibold'>${cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0).toFixed(2)}</span></p>
        <div className='w-full'><input type="text" className='w-full' placeholder='add a message or note' value={orderNote} onChange={e => setOrderNote(e.target.value)}/></div>
        <button onClick={() => setAdressOpen(true)}>Go back</button>  
        <button onClick={makeOrder}>Procceed to Payment</button>
        </div>
        </div>
      </div>
      </div>}
    <Footer />
    </>
  )
}

export default Cart