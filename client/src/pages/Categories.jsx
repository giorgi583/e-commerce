import { ArrowRight, ChevronRight, Home, LayoutDashboard } from 'lucide-react';
import React, { useEffect} from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
const Categories = () => {
  const navigate = useNavigate()
  const apiURL = import.meta.env.VITE_API_URL;
  const [categories, setCategories] = React.useState([]);
  const getCategories = async () => {
    try {
      const response = await fetch(`${apiURL}/products/categories`);
      const result = await response.json();
      setCategories(result.categories);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCategories();
  }, [])
  return (
    <>
      <Header />
    <div className='max-w-7xl mx-auto py-15'>
      <div className='flex items-center gap-2 mb-5 p-2 px-3 rounded-full bg-gray-200 text-gray-600 font-semibold max-w-fit'>
        <NavLink to='/' className='flex items-center gap-2 hover:text-[var(--accent)]'> <Home size={20} /> Home</NavLink>
        <span><ChevronRight size={20} /></span>
        <span className='text-[var(--accent)] flex items-center gap-2'><LayoutDashboard size={20} /> Categories</span>
      </div>
      <h1 className='text-2xl font-bold text-[var(--accent)] mb-10'>Categories</h1>
      <div className='grid grid-cols-4 gap-4  max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1'>
      {categories && categories.map((category, index) => (
        <div key={index} onClick={() => navigate(`/categories/${category.category}`)} className='p-3  rounded-lg flex  group bg-amber-100 overflow-hidden items-center justify-between py-5 text-[var(--secondary)] hover:scale-105 cursor-pointer hover:bg-[var(--accent)] transition-all duration-300'>
          <h2 className='text-xl font-bold text-[var(--secondary)]'>{category.category}</h2>
          <ArrowRight className='translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300' size={30}/>
        </div>
      ))}
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Categories