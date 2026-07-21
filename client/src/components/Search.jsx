import React, { useEffect } from 'react'
import { Search, SearchIcon, X } from 'lucide-react'
import placeholder from '../assets/placeholder_600x.webp'
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
                    <button className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200'>Electronics <X className='inline ml-2 size-5'/></button>
                    <button className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200'>Computers <X className='inline ml-2 size-5'/></button>
                    <button className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200'>Furniture <X className='inline ml-2 size-5'/></button>
                    <button className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200'>Travel <X className='inline ml-2 size-5'/></button>
                    <button className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200'>Speakers <X className='inline ml-2 size-5'/></button>
                    <button className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200'>Sport <X className='inline ml-2 size-5'/></button>
                    <button className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200'>Health <X className='inline ml-2 size-5'/></button>
                </div>
                </div>}
                <div className=' mt-10'>
            {products.length > 0 && search ? products.map(product =>(
                <div key={product.id} className='flex items-stretch gap-5 my-5 hover:bg-gray-100 cursor-pointer rounded-lg'>
                  <div className='w-20 h-full'><img className='w-full' src={placeholder} alt="placeholder"></img></div>
                  <div className='w-full flex flex-col'>
                   <h3 className='text-lg font-semibold'>{product.name}</h3>
                   <p className='text-[var(--secondary)]'>${product.price}</p>
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