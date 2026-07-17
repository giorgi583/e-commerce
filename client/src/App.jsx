import {lazy, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {loginSuccess, loginFailure} from './slices/userSlice'
// pages
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Products = lazy(() => import('./pages/Products'))
const Profile = lazy(() => import('./pages/Profile'))
// components
import Loader from './components/Loader'
import AddProduct from './pages/AddProduct'
import Categories from './pages/Categories'
import ProductsByCategory from './pages/ProductsByCategory'
function App() {
  const user = useSelector(state => state.user)
const apiUrl = import.meta.env.VITE_API_URL
const dispatch = useDispatch()
async function getUser(){
  const token = localStorage.getItem('token')
  if(!token) {
    dispatch(loginFailure('No token'))
    return
  }
  try {
    const response = await fetch(apiUrl + '/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    if(!response.ok) {
      throw new Error(data.message)
      if (response.status === 401) {
        localStorage.removeItem("token");
        
      }
    }
    const data = await response.json()
    console.log(data.user.username)
    dispatch(loginSuccess(data.user))
   
  } catch (error) {
    dispatch(loginFailure(error.message))
    console.log(error)
   
  }
}
useEffect(() => {
  getUser()
},[])
  return (
   <>
   <BrowserRouter>
    <Suspense fallback={<Loader />}>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path='/login' element={<Login getUser={getUser}/>} />
    <Route path='/register' element={<Register />} />
    <Route path='/products' element={<Products user={'customer'}/>} />
    <Route path='/categories' element={<Categories/>} />
    <Route path='/categories/:category' element={<ProductsByCategory />} />
    <Route path='/admin/products' element={<Products user={'admin'}/>} />
    <Route path='/add-product' element={<AddProduct />} />
    <Route path='/profile' element={<Profile />} />
   </Routes>
    </Suspense>
   </BrowserRouter>
   </>
  )
}

export default App
