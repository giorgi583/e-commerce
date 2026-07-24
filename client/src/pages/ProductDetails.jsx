import React, { useEffect } from 'react'
import { ChevronRight, Home, LayoutDashboard, Shirt } from 'lucide-react'
import { NavLink, useParams, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
// components
import Header from '../components/Header'
import Footer from '../components/Footer'
import Reviews from '../components/Reviews'
import AboutProduct from '../components/AboutProduct'
import SimilarProducts from '../components/SimilarProducts'
const ProductDetails = () => {
    const {id} = useParams()
    console.log(id);
    const [product, setProduct] = React.useState([]);
    const [section, setSection] = React.useState('aboutProduct');
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const getProduct = async () => {
        try {
            const response = await fetch(`${apiUrl}/products/${id}`);
            const result = await response.json();
            if(response.status === 404) {
                navigate('/products');
                throw new Error(result.message);
            }
            setProduct(result.product);
            console.log(result);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    useEffect(() => {
        getProduct();
    }, [])
  return (
    <>
    <Header/>
    <div className='max-w-7xl mx-auto py-15'>
<div className='flex items-center gap-2 mb-5 p-2 px-3 rounded-full bg-gray-200 text-gray-600 font-semibold max-w-fit'>
        <NavLink to='/' className='flex items-center gap-2 hover:text-[var(--accent)]'> <Home size={20} /> Home</NavLink>
        <span><ChevronRight size={20} /></span>
        <NavLink to='/products' className='flex items-center gap-2 hover:text-[var(--accent)]'> <Shirt size={20} /> Products</NavLink>
        <span><ChevronRight size={20} /></span>
        <span className='text-[var(--accent)]'>{product?.name}</span>
      </div>
      <div className='flex items-center gap-4 mb-5 px-3 rounded-xl bg-gray-200 text-gray-600 font-semibold max-w-fit'>
        <a onClick={() => setSection('aboutProduct')} href='#aboutProduct' className={section === 'aboutProduct' ? 'text-[var(--accent)] border-b-amber-700 border-b-3 p-2' : 'p-2'}>About</a>
        <a onClick={() => setSection('reviews')} className={section === 'reviews' ? 'text-[var(--accent)] border-b-amber-700 border-b-3 p-2' : 'p-2'} href='#reviews'>Reviews</a>
        <a onClick={() => setSection('similarProducts')} className={section === 'similarProducts' ? 'text-[var(--accent)] border-b-amber-700 border-b-3 p-2' : 'p-2'} href='#similarProducts'>Similar</a>
      </div>
      <div className='flex flex-col items-center gap-5 w-full'>
      <AboutProduct product={product} />
      <Reviews product={product} />
      <SimilarProducts product={product} />
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default ProductDetails