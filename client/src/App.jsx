import {lazy} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
// pages
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Products = lazy(() => import('./pages/Products'))
function App() {


  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/products' element={<Products />} />
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
