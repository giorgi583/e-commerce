import React from 'react'
import placeholder from '../assets/placeholder_600x.webp'
import { Check, LucideArrowUpNarrowWide, ShoppingCart, XIcon } from 'lucide-react'
import {toast} from 'react-hot-toast'
import SearchBar from './Search'
import SearchCompare from './SearchCompare'
import {useNavigate, Link} from 'react-router-dom'

const AboutProduct = ({product}) => {
  const [compareWindow, setCompareWindow] = React.useState(false);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const addToCart = async (id, quantity) => {
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
  return (
   product && <div id='aboutProduct' className='p-5 rounded-3xl text-gray-600 font-semibold w-full'>
  <div className='flex gap-20 mb-5 p-2 px-3 max-xl:gap-10 max-lg:gap-5 items-center max-md:flex-col max-md:items-center'>
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
    <div className='text-lg py-2 px-5 rounded bg-amber-100 text-green-600 flex items-center max-lg:text-base'><Check className='inline mr-2 size-5'/> Free Shipping</div>
  </div>
  </div>
  <div className='flex gap-10 items-center'>
    <button onClick={()=> addToCart(product?.id, product?.quantity)} aria-label='add to cart' className='text-xl py-2 px-5 rounded-full flex items-center max-lg:text-base'><ShoppingCart className='inline mr-2 size-5'/><p className='font-bold max-xl:hidden'>Add to cart</p></button>
    <button onClick={() => setCompareWindow(true)} className='text-xl py-2 px-5 rounded-full flex items-center max-lg:text-base'><LucideArrowUpNarrowWide className='inline mr-2 size-5'/> Compare</button>
  </div>
  </div>
  </div>
  </div>
  {compareWindow && <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center'>
    <div className='bg-white p-5 rounded-3xl w-1/2 h-1/2 flex flex-col gap-5 relative'>
      <h2 className='text-2xl font-bold text-[var(--secondary)]'>Select Another Product</h2>
      <div className='absolute top-5 right-5 cursor-pointer' onClick={() => setCompareWindow(false)}><XIcon/></div>
      <div className='flex gap-5 w-full items-center'>
        <div className='flex flex-col gap-3 w-1/2'>
          <SearchCompare currentId={product?.id} setSelectedProduct={setSelectedProduct}/>
        </div>
        <button onClick={() => {setCompareWindow(false); navigate(`/products/compare?id1=${product?.id}&id2=${selectedProduct?.id}`)}} className='bg-[var(--secondary)] text-white py-2 px-5 rounded-full'>Compare</button>
        <div className='flex flex-col gap-3 items-center'>
          <p>{product.name}</p> <p>vs</p> <span className='text-[var(--secondary)]'>{selectedProduct?.name || 'Select a product'}</span>
        </div>
         </div>
    </div> </div>}
    </div>
  )
}

export default AboutProduct