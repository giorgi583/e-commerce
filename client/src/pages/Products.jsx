import React, { useEffect} from 'react'
import ProductCard from '../components/ProductCard'
import { ChevronDown, ChevronRight, Home, Plus, Shirt } from 'lucide-react'
import Pagination from '../components/Pagination'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Filters from '../components/Filters'
import { useNavigate, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Products = ({user}) => {
  const navigate = useNavigate()
  const [sortingOpen, setSortingOpen] = React.useState(false)
  const [checkedCategories, setCheckedCategories] = React.useState([])
  const [brand, setBrand] = React.useState('')
  const [minPrice, setMinPrice] = React.useState(0)
  const [maxPrice, setMaxPrice] = React.useState(3000)
  const [name, setName] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [products, setProducts] = React.useState([])
  const [pages, setPages] = React.useState(1)
  const [sort, setSort] = React.useState('')
  const [order, setOrder] = React.useState('')
const apiUrl = import.meta.env.VITE_API_URL;
const user1 = useSelector(state => state.user)
const location = useLocation()
useEffect(() => {
  
  if(!user1.user && location.pathname === '/admin/products') {
    navigate('/access-denied')
  }
}, [user1, location.pathname, navigate])

  const getProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/products?page=${currentPage}${sort && order ? `&sort=${sort}&order=${order}` : ''}&categories=${checkedCategories.join(',')}&brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}&name=${name}`);
      const result = await response.json();
      console.log(result);
      setProducts(result.products);
      setPages(result.pages);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, [currentPage, sort, order, checkedCategories, brand, minPrice, maxPrice, name]);
 
  return (
    <>
    <Header />
    <div className='max-w-7xl mx-auto py-15'>
       <div className='flex items-center gap-2 mb-5 p-2 px-3 rounded-full bg-gray-200 text-gray-600 font-semibold max-w-fit'>
        <NavLink to='/' className='flex items-center gap-2 hover:text-[var(--accent)]'> <Home size={20} /> Home</NavLink>
        <span><ChevronRight size={20} /></span>
        <span className='text-[var(--accent)] flex items-center gap-2'><Shirt size={20} /> Products</span>
      </div>
    <div className='grid grid-cols-4 gap-4 '>
      <div className='col-span-1 relative'>
        <Filters name={name} setName={setName} setCurrentPage={setCurrentPage} checkedCategories={checkedCategories} setCheckedCategories={setCheckedCategories} brand={brand} setBrand={setBrand} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice}/>
      </div>
      <div className='col-span-3 flex flex-col gap-5'>
       <div className='flex items-center justify-between'> 
        <h1 className='text-2xl font-bold text-[var(--accent)]'>Products</h1> 
        {user === 'admin' && <button onClick={() => navigate('/add-product')} className=' py-2 px-4 rounded-lg flex items-center gap-2'><Plus />Add Product</button>}
        <div  className='relative w-[200px] '>
          <div onClick={() => setSortingOpen(!sortingOpen)} className='flex items-center relative bg-[var(--light-grey)] max-w-fit rounded-full py-2 px-3 cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.1)] shadow-amber-500'>
          <p className='cursor-pointer flex items-center gap-2'>Sort <ChevronDown className={sortingOpen ? 'rotate-180 transition-all duration-300' : 'transition-all duration-300'} size={20}/></p>
          </div>
        {sortingOpen && <div className='flex flex-col gap-2 absolute top[100%] left-0 bg-white p-3 shadow rounded-xl z-20 '>
          <p onClick={() => {setSortingOpen(false); setSort(''); setOrder('')}} className={`hover:bg-gray-50 cursor-pointer rounded-lg p-2 ${!sort && !order ? 'bg-gray-100' : 'bg-white'}`}>Default</p>
          <p onClick={() => {setSortingOpen(false); setSort('name'); setOrder('asc')}} className={`hover:bg-gray-50 cursor-pointer rounded-lg p-2 ${sort === 'name' && order === 'asc' ? 'bg-gray-100' : 'bg-white'}`}>A-Z</p>
          <p onClick={() => {setSortingOpen(false); setSort('name'); setOrder('desc')}} className={`hover:bg-gray-50 cursor-pointer rounded-lg p-2 ${sort === 'name' && order === 'desc' ? 'bg-gray-100' : 'bg-white'}`}>Z-A</p>
          <p onClick={() => {setSortingOpen(false); setSort('price'); setOrder('asc')}} className={`hover:bg-gray-50 cursor-pointer rounded-lg p-2 ${sort === 'price' && order === 'asc' ? 'bg-gray-100' : 'bg-white'}`}>Price: Low to High</p>
          <p onClick={() => {setSortingOpen(false); setSort('price'); setOrder('desc')}} className={`hover:bg-gray-50 cursor-pointer rounded-lg p-2 ${sort === 'price' && order === 'desc' ? 'bg-gray-100' : 'bg-white'}`}>Price: High to Low</p>
          </div>}
          
          </div>
       </div>
        <div className='grid grid-cols-4 gap-4'>
         {products.map((product, index) => (
           <ProductCard id={product.id} name={product.name} price={product.discountedPrice} oldPrice={product.price} user={user} quantity={product.quantity} getProducts={getProducts}/>
         ))}
        </div>
        <Pagination pages={pages ? pages : 1} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default Products