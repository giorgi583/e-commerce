import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ChevronRight, Home, LayoutDashboard } from 'lucide-react'
import ProductCard from '../components/ProductCard'

const ProductsByCategory = () => {
    const {category} = useParams()
    const [products, setProducts] = React.useState([]);
    const apiURL = import.meta.env.VITE_API_URL;
    const getProductsByCategory = async () => {
        try {
        const response = await fetch(`${apiURL}/products/categories/${category}`);
        const result = await response.json();
        console.log(result);
        setProducts(result.products);} catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProductsByCategory();
    }, []);
  return (
    <>
    <Header />
    <div className='max-w-7xl mx-auto py-15'>
        <div className='flex items-center gap-2 mb-5 p-2 px-3 rounded-full bg-gray-200 text-gray-600 font-semibold max-w-fit'>
        <NavLink to='/' className='flex items-center gap-2 hover:text-[var(--accent)]'> <Home size={20} /> Home</NavLink>
        <span><ChevronRight size={20} /></span>
        <NavLink to='/categories' className='flex items-center gap-2 hover:text-[var(--accent)]'> <LayoutDashboard size={20} /> Categories</NavLink>
        <span><ChevronRight size={20} /></span>
        <span className='text-[var(--accent)]'> {category}</span>
      </div>
        <h1 className='text-2xl font-bold text-[var(--accent)] mb-10'>{category} ({products.length})</h1>
        <div className='grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1'>
            {products && products.map((product, index) => (
                <ProductCard id={product.id} rating={product.rating} name={product.name} price={product.discountedPrice} oldPrice={product.price} />
            ))}
        </div>
    </div>
    <Footer />
    </>
  )
}

export default ProductsByCategory