import React from 'react'
import { Phone, Truck, Map, MenuIcon, Search, User2, ShoppingCart, XIcon, Settings, LogOut, Home, LayoutDashboard, ChevronDown, Shirt, LogOutIcon, Package, Badge} from 'lucide-react'
import SearchBar from './Search'
import { NavLink } from 'react-router-dom'
import { FaProductHunt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../slices/userSlice'
import { useNavigate } from 'react-router-dom'

const Header = ({cartItems}) => {
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
    const [navOpen, setNavOpen] = React.useState(false)
    const user = useSelector(state => state.user)
    console.log(user?.user)
    const dispatch = useDispatch()
    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(logout())
        navigate('/login')
    }
  return (
    <header className='w-full border-b border-gray-200 shadow sticky top-0 z-50 bg-white'> 
        <div className='bg-[var(--accent)] w-full flex items-center justify-between py-1 px-7 max-lg:text-sm max-md:px-3 max-md:text-xs max-md:hidden'>
            <p className='text-white grow text-center py-1 px-4'>
                <Truck className='inline mr-2 size-5'/>
             Free shipping on orders over $50
            </p>
            <p className='text-white border-x border-cyan-200 py-1 px-4 grow text-center'>
            <Map className='inline mr-2 size-5'/>
             Track your orders
            </p>
            <p className='text-white grow text-center py-1 px-4'>
            <Phone className='inline mr-2 size-5'/> contact: +1 (123) 456-7890
            </p>
        </div>
        <div className='flex items-center justify-between py-5 px-15  max-w-7xl mx-auto max-md:px-3'>
            <div className='flex items-center justify-between gap-15 max-xl:gap-10 max-lg:gap-5'>
                <MenuIcon onClick={() => setOpen(!open)} className='md:hidden' size={24} color='var(--secondary)'/>
               <div className={`md:hidden bg-amber-50 fixed top-0 -left-[100%] w-full h-full z-50 p-10 pt-20 transition-all duration-300 ${open ? 'left-0' : ''}`}>
                   <div className='flex flex-col gap-2 absolute top-5 right-5 '>
                        <NavLink to={'/'} ><h1 className='text-2xl font-bold text-[var(--accent)]'>E-<span className="text-[var(--secondary)]">Buy.</span></h1></NavLink>
                   </div>
                <XIcon onClick={() => setOpen(!open)} className='md:hidden absolute top-5 left-5' size={24} color='var(--secondary)'/>
                   <SearchBar />
                   <div className='flex flex-col gap-2 absolute bottom-5 left-0 w-full items-center '>
                    <p className='p-3'><Settings className='inline mr-2 size-5'/>Settings</p>
                    <hr className='w-[90%] text-gray-200'></hr>
                    <p className='p-3'><LogOut className='inline mr-2 size-5'/> Logout</p>
                   </div>
                </div>
            <NavLink to={'/'} ><h1 className='text-3xl font-bold text-[var(--accent)] max-sm:text-2xl'>E-<span className="text-[var(--secondary)]">Buy.</span></h1></NavLink>
            <div className=' min-w-100 max-md:hidden max-w-120 max-xl:max-w-80 max-xl:min-w-0 max-md:max-w-60  max-sm:max-w-50 '> <SearchBar /> </div>
            </div>
            <div className='flex items-center gap-5 relative'>
              {user?.user?.role !== 'admin' &&  <div onClick={() => setNavOpen(!navOpen)} className='flex items-center gap-3 p-3 rounded-full border border-gray-200 cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.2)] shadow-amber-600 transition-all duration-200 max-sm:text-xs max-sm:p-1 max-sm:gap-1'>Navigation <ChevronDown className='inline size-5 max-sm:size-4'/></div>
              } {user?.user?.role !== 'admin' && navOpen && <div className='absolute top-[100%] left-0 border border-gray-200 rounded-2xl flex flex-col gap-2 bg-white p-5'>
                <NavLink to={'/products'} className='flex items-center max-md:hidden p-3 rounded-full border border-gray-200 cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.2)] shadow-amber-600 transition-all duration-200'><Shirt className='inline mr-2 size-5'/> Products</NavLink>
            <NavLink to={'/categories'} className='flex items-center border border-gray-200 p-3 rounded-full max-md:hidden cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.2)] shadow-amber-600 transition-all duration-200'><LayoutDashboard className='inline mr-2 size-5'/> Categories</NavLink>
                <NavLink to={'/cart'} className='flex items-center max-md:hidden gap-3 p-3 rounded-full border border-gray-200 cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.2)] shadow-amber-600 transition-all duration-200'><ShoppingCart className='inline size-5 max-sm:size-4'/>Cart {cartItems > 0 && <div className='bg-[var(--accent)] text-white rounded-full w-4 h-4 flex font-bold items-center justify-center text-xs'>{cartItems}</div>}</NavLink>
                </div>}
                {
                 user?.user?.role === 'admin' && <div onClick={() => setNavOpen(!navOpen)} className='flex items-center gap-3 p-3 rounded-full border border-gray-200 cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.2)] shadow-amber-600 transition-all duration-200'>Admin panel</div>   
                }
                { user?.user?.role === 'admin' && navOpen && <div className='absolute top-[100%] left-0 border border-gray-200 rounded-2xl flex flex-col gap-2 bg-white p-5'>
                <NavLink to={'/admin/products'} className='flex items-center max-md:hidden p-3 rounded-full border border-gray-200 cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.2)] shadow-amber-600 transition-all duration-200'><Shirt className='inline mr-2 size-5'/> Products</NavLink>
            <NavLink to={'/admin/users'} className='flex items-center border border-gray-200 p-3 rounded-full max-md:hidden cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.2)] shadow-amber-600 transition-all duration-200'><User2 className='inline mr-2 size-5'/> Users</NavLink>
                <NavLink to={'/admin/orders'} className='flex items-center max-md:hidden gap-3 p-3 rounded-full border border-gray-200 cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.2)] shadow-amber-600 transition-all duration-200'><Package className='inline size-5 max-sm:size-4'/>Orders</NavLink>
                </div>}
            </div>
            <div className='flex items-center gap-5 '>
               {user.user ? <div className='flex items-center gap-3'><NavLink to={'/profile'} className='flex items-center max-sm:text-xs'><User2 className='inline mr-2 size-4 max-sm:size-3'/>{user?.user?.username}</NavLink> <button onClick={handleLogout} className='flex items-center max-sm:text-xs bg-transparent border text-black border-gray-200 p-3 rounded-full cursor-pointer'><LogOutIcon className='inline mr-2 size-4 max-sm:size-3'/> Logout</button></div> : <NavLink to={'/login'} className='flex items-center max-sm:text-xs'><User2 className='inline mr-2 size-4 max-sm:size-3'/>Login</NavLink>}
            </div>
        </div> 
        <div className='fixed bottom-0 border-t bg-white border-gray-200 w-full text-[var(--accent)] z-40 p-3 flex items-center justify-evenly md:hidden'>
            <div className='flex flex-col items-center justify-center'><Home className='inline mr-2 size-5'/>Home</div>
            <div className='flex flex-col items-center justify-center'><LayoutDashboard className='inline mr-2 size-5'/>Categories</div>
            <div className='flex flex-col items-center justify-center'><ShoppingCart className='inline mr-2 size-5'/>Cart</div>
            <div className='flex flex-col items-center justify-center'><User2 className='inline mr-2 size-5'/>Profile</div>
        </div>
    </header>
  )
}

export default Header