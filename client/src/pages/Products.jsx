import React from 'react'
import ProductCard from '../components/ProductCard'
import { ChevronDown } from 'lucide-react'
import Pagination from '../components/Pagination'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Filters from '../components/Filters'

const Products = () => {
  const [sortingOpen, setSortingOpen] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  return (
    <>
    <Header />
    <div className='max-w-7xl mx-auto py-15'>
    <div className='grid grid-cols-4 gap-4'>
      <div className='col-span-1'>
        <Filters />
      </div>
      <div className='col-span-3 flex flex-col gap-5'>
       <div className='flex items-center justify-between'> 
        <h1 className='text-2xl font-bold text-[var(--accent)]'>Products</h1> 
        <div  className='relative w-[200px]'>
          <div onClick={() => setSortingOpen(!sortingOpen)} className='flex items-center relative bg-[var(--light-grey)] max-w-fit rounded-full py-2 px-3 cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] shadow-amber-500'>
          <p className='cursor-pointer flex items-center gap-2'>Sort <ChevronDown className={sortingOpen ? 'rotate-180 transition-all duration-300' : 'transition-all duration-300'} size={20}/></p>
          </div>
        {sortingOpen && <div className='flex flex-col gap-2 absolute top[100%] left-0 bg-white p-3 shadow rounded-xl z-20 '>
          <p className='hover:bg-gray-50 cursor-pointer rounded-lg p-2'>A-Z</p>
          <p className='hover:bg-gray-50 cursor-pointer rounded-lg p-2'>Z-A</p>
          <p className='hover:bg-gray-50 cursor-pointer rounded-lg p-2'>Price: Low to High</p>
          <p className='hover:bg-gray-50 cursor-pointer rounded-lg p-2'>Price: High to Low</p>
          </div>}
          </div>
       </div>
        <div className='grid grid-cols-4 gap-4'>
         {Array.from({length: 20}, (_, index) => (
           <ProductCard key={index} />
         ))}
        </div>
        <Pagination pages={6} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default Products