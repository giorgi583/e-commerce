import React from 'react'
import { Search, X } from 'lucide-react'

const SearchBar = () => {
    const [open, setOpen] = React.useState(false)
  return (
    <div className='relative bg-white z-50 rounded-3xl'>
    <div className='relative peer z-40 rounded-3xl'>
                <input type="text" placeholder='Search...' className='border border-gray-300 p-3 px-5 w-full max-sm:p-1 rounded-full  focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all duration-200'/>
                <Search className='inline mr-2 size-5 text-gray-600 absolute right-3 top-[50%] transform -translate-y-1/2'/>
            </div>
            <div className='hidden peer-focus-within:block absolute top-0 left-0 w-full p-5 bg-white z-30 rounded-3xl max-sm:rounded-2xl'>
                <h2 className='text-lg font-semibold mt-10 mb-5'>Popular</h2>
                <div className='flex flex-wrap gap-2'>
                    <button className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200'>Headphones <X className='inline ml-2 size-5'/></button>
                    <button className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200'>Laptops <X className='inline ml-2 size-5'/></button>
                    <button className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200'>Earphones <X className='inline ml-2 size-5'/></button>
                    <button className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200'>Smartphones <X className='inline ml-2 size-5'/></button>
                    <button className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200'>Speakers <X className='inline ml-2 size-5'/></button>
                    <button className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200'>Tablets <X className='inline ml-2 size-5'/></button>
                    <button className='text-[var(--secondary)] cursor-pointer hover:bg-gray-300 rounded-full border border-gray-300 px-3 py-1 bg-gray-200'>Monitors <X className='inline ml-2 size-5'/></button>
                </div>
            </div>
            <div className='hidden peer-focus-within:block fixed top-0 left-0 w-full h-full z-20 bg-black/30'></div>
            </div>
  )
}

export default SearchBar