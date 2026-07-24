import { Lock, Mail } from 'lucide-react'
import React from 'react'
import Header from '../components/Header'
import { useNavigate, Link } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { loginSuccess } from '../slices/userSlice'
import { useDispatch } from 'react-redux'
import Loader from '../components/Loader'
const Login = ({getUser}) => {
    const [error, setError] = React.useState(null)
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const apiUrl = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
    async function handleSubmit(e) {
        setLoading(true)
        e.preventDefault()
        const form = new FormData(e.target)
        const email = form.get('email')
        const password = form.get('password')
        console.log(email, password)
        setError(null)
        try {
            const response = await fetch(apiUrl + '/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            if(response.ok) {
                localStorage.setItem('token', data.token)
                await getUser()
                toast.success(data.message)
                setTimeout(() => {
                    navigate('/')
                }, 2000)
                console.log(data)
            }
            else {
                setError(data.message)
            }
        } catch (error) {
        toast.error(error.message)
        }
        setLoading(false)
    }
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-10 bg-indigo-50'>
   
    <div>
        <Link to='/' className='text-6xl font-bold text-[var(--accent)]'>E-<span className="text-[var(--secondary)]">Buy.</span></Link>
    </div>
    <div className='max-w-lg p-10 shadow bg-white'>
        <h1 className='text-2xl font-bold text-[var(--accent)] my-5'>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2 relative'>
                <label htmlFor="email">Email</label>
                <div className='flex items-center relative bg-[var(--light-grey)] rounded-md focus-within:ring-2 focus-within:ring-[var(--secondary)]'>
                <Mail className='inline size-5 absolute left-3' color='gray'/>
                <input className='w-full px-10' type="email" name="email" id="email" required placeholder="Enter your email" />
                </div>
            </div>
            <div className='flex flex-col gap-2 relative'>
                <label htmlFor="password">Password</label>
                <div className='flex items-center relative bg-[var(--light-grey)] rounded-md focus-within:ring-2 focus-within:ring-[var(--secondary)]'>
                <Lock className='inline mr-2 size-5 absolute left-3' color='gray'/>
                <input className='w-full px-10' type="password" name="password" id="password" required placeholder="Enter your password" />
                </div>
            </div>
            <div className='text-red-500'>
                {error && <p>{error}</p>}
            </div>
            <button type="submit">Login</button>
            <p>Don't have an account? <a href="/register" className='text-[var(--secondary)]'>Register</a></p>
            {loading && <Loader />}
        </form>
    </div>
    </div>
  )
}

export default Login