import {lazy} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
// pages
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
function App() {


  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path='/login' element={<Login />} />
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
