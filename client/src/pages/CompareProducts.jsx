import React, {useRef} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {useSearchParams, NavLink} from 'react-router-dom'
import { ChevronRight, Home, Shirt } from 'lucide-react'
import {toast} from 'react-hot-toast'
const CompareProducts = () => {
  const [searchParams] = useSearchParams();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [product1, setProduct1] = React.useState([]);
  const [product2, setProduct2] = React.useState([]);
  const id1 = searchParams.get('id1');
  const id2 = searchParams.get('id2');
const getProduct = async () => {
        try {
            const response1 = await fetch(`${apiUrl}/products/${id1}`);
            const result1 = await response1.json();
            if(response1.status === 404) {
                navigate('/products');
                throw new Error(result1.message);
            }

            const response2 = await fetch(`${apiUrl}/products/${id2}`);
            const result2 = await response2.json();
            if(response2.status === 404) {
                navigate('/products');
                throw new Error(result2.message);
            }

            setProduct1(result1.product);
            setProduct2(result2.product);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    React.useEffect(() => {
        getProduct();
    }, [id1, id2])

   
  return (
    <>
      <Header />
    <div className='max-w-7xl mx-auto py-15 px-10'>
      <div className='flex items-center gap-2 mb-5 p-2 px-3 rounded-full bg-gray-200 text-gray-600 font-semibold max-sm:text-xs max-w-fit'>
        <NavLink to='/' className='flex items-center gap-2 hover:text-[var(--accent)]'> <Home size={20} /> Home</NavLink>
        <span><ChevronRight size={20} /></span>
        <NavLink to='/products' className='flex items-center gap-2 hover:text-[var(--accent)]'> <Shirt size={20} /> Products</NavLink>
        <span><ChevronRight size={20} /></span>
        <span className='text-[var(--accent)]'>Comparison</span>
      </div>
      <h2 className='text-2xl font-bold text-[var(--accent)] mb-10'>Compare Products</h2>
      <div className='grid grid-cols-[1fr_2fr_2fr] border border-gray-300 rounded-lg shadow-lg'>
        
  <h3 className="text-xl font-semibold bg-[var(--secondary)] p-2 text-white rounded-tl-lg max-md:text-base">
    Name
  </h3>
  <h3 className="text-xl font-semibold bg-[var(--secondary)] p-2 text-white max-md:text-base">
    {product1.name}
  </h3>
  <h3 className="text-xl font-semibold bg-[var(--secondary)] p-2 text-white rounded-tr-lg max-md:text-base">
    {product2.name}
  </h3>

  <p className="bg-amber-50 p-2">Price</p>
  <p className="bg-amber-50 p-2">
    ${product1.discountedPrice || product1.price}
  </p>
  <p className="bg-amber-50 p-2">
    ${product2.discountedPrice || product2.price}
  </p>

  <p className="bg-indigo-50 p-2">Category</p>
  <p className="bg-indigo-50 p-2">{product1.category}</p>
  <p className="bg-indigo-50 p-2">{product2.category}</p>
      
  <p className="bg-amber-50 p-2">Description</p>
  <p className="bg-amber-50 p-2">
    {product1.description}
  </p>
  <p className="bg-amber-50 p-2">
    {product2.description}
  </p>

  <p className="bg-indigo-50 p-2">Rating</p>
  <p className="bg-indigo-50 p-2">{product1.rating}</p>
  <p className="bg-indigo-50 p-2">{product2.rating}</p>

  <p className="bg-amber-50 p-2">Brand</p>
  <p className="bg-amber-50 p-2">{product1.brand}</p>
  <p className="bg-amber-50 p-2">{product2.brand}</p>

  <p className="bg-indigo-50 p-2">In stock</p>
  <p className="bg-indigo-50 p-2">{product1.stock}</p>
  <p className="bg-indigo-50 p-2">{product2.stock}</p>

  <p className="bg-amber-50 p-2 rounded-bl-lg">Quantity</p>
  <p className="bg-amber-50 p-2">{product1.quantity}</p>
  <p className="bg-amber-50 p-2 rounded-br-lg">{product2.quantity}</p>
      </div>
    </div>
      <Footer />
    </>
  )
}

export default CompareProducts