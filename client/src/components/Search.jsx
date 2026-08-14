import React, { useEffect } from 'react'
import { Search, SearchIcon, X } from 'lucide-react'
import placeholder from '../assets/placeholder_600x.webp'
import { useNavigate } from 'react-router-dom'
const SearchBar = () => {
    const [open, setOpen] = React.useState(false)
    const [products, setProducts] = React.useState([])
    const [search, setSearch] = React.useState('')
const apiUrl = import.meta.env.VITE_API_URL;
    const getProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/products?name=${search}`);
      const result = await response.json();
      console.log(result);
      setProducts(result.products);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProducts()
  }, [search])
  const navigate = useNavigate()
  return (
    <div className='relative bg-white z-50 rounded-3xl '>
    <div className='relative peer z-40 rounded-3xl'>
                <input type="text" placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} className='border border-gray-300 p-3 px-5 w-full max-sm:p-1 rounded-full  focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all duration-200'/>
                <Search className='inline mr-2 size-5 text-gray-600 absolute right-3 top-[50%] transform -translate-y-1/2'/>
            </div>
            <div className='hidden peer-focus-within:block absolute top-0 left-0 w-full p-5 bg-white z-30 rounded-3xl max-sm:rounded-2xl max-h-[400px] overflow-scroll scrollbar-hide'>
                {!search && <div>
                <h2 className='text-lg font-semibold mt-10 mb-5'>Popular</h2>
                <div className='flex flex-wrap gap-2'>
                    <button onMouseDown={()=> { navigate('/categories/Electronics')}} className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200 max-lg:text-xs max-lg:gap-1'>Electronics <X className='inline size-5 max-lg:size-4'/></button>
                    <button onMouseDown={()=> { navigate('/categories/Computers')}} className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200 max-lg:text-xs max-lg:gap-1'>Computers <X className='inline size-5 max-lg:size-4'/></button>
                    <button onMouseDown={()=> { navigate('/categories/Furniture')}} className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200 max-lg:text-xs max-lg:gap-1'>Furniture <X className='inline size-5 max-lg:size-4'/></button>
                    <button onMouseDown={()=> { navigate('/categories/Travel')}} className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200 max-lg:text-xs max-lg:gap-1'>Travel <X className='inline size-5 max-lg:size-4'/></button>
                    <button onMouseDown={()=> { navigate('/categories/Fitness')}} className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200 max-lg:text-xs max-lg:gap-1'>Fitness <X className='inline  size-5 max-lg:size-4'/></button>
                    <button onMouseDown={()=> { navigate('/categories/Sport')}} className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200 max-lg:text-xs max-lg:gap-1'>Sport <X className='inline  size-5 max-lg:size-4'/></button>
                    <button onMouseDown={()=> { navigate('/categories/Health')}} className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200 max-lg:text-xs max-lg:gap-1'>Health  <X className='inline size-5 max-lg:size-4'/></button>
                </div>
                </div>}
                <div className=' mt-10'>
            {products.length > 0 && search ? products.map(product =>(
                <div onMouseDown={()=> {navigate(`/product/${product.id}`); setSearch('')}} key={product.id} className='flex items-stretch gap-5 my-4 hover:bg-gray-100 cursor-pointer rounded-lg'>
                  <div className='w-22 h-full'><img className='w-full h-full' src={placeholder} alt="placeholder"></img></div>
                  <div className='w-full flex flex-col'>
                   <h3 className='text-lg font-semibold max-lg:text-sm w-full'>{product.name}</h3>
                   <p className='text-[var(--secondary)] max-lg:text-sm'>${product.discountedPrice || product.price}</p>
                   {product.discountedPrice && <span className='line-through text-xs text-gray-500'>${product.price}</span>}
                   </div>
                    </div>
            )): search && <div className='flex flex-col items-center gap-5 p-5 mt-10'><SearchIcon size={30}/> <p>No products found</p></div>}
            </div>
            </div>
            <div className='hidden peer-focus-within:block fixed top-0 left-0 w-full h-full z-20 bg-black/30'></div>
            </div>
  )
}

export default SearchBar