import { Lock, Mail } from 'lucide-react'
import React from 'react'
import Header from '../components/Header'

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-10 bg-indigo-50'>
   
    <div>
        <p className='text-6xl font-bold text-[var(--accent)]'>E-<span className="text-[var(--secondary)]">Buy.</span></p>
    </div>
    <div className='max-w-lg p-10 shadow bg-white'>
        <h1 className='text-2xl font-bold text-[var(--accent)] my-5'>Login</h1>
        <form className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
                <label htmlFor="email">Email</label>
                <div className='flex items-center relative bg-[var(--light-grey)] rounded-md px-3 focus-within:ring-2 focus-within:ring-[var(--secondary)]'>
                <Mail className='inline size-5' color='gray'/>
                <input className='w-full' type="email" name="email" id="email" required placeholder="Enter your email" />
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="password">Password</label>
                <div className='flex items-center relative bg-[var(--light-grey)] rounded-md px-3 focus-within:ring-2 focus-within:ring-[var(--secondary)]'>
                <Lock className='inline mr-2 size-5' color='gray'/>
                <input className='w-full' type="password" name="password" id="password" required placeholder="Enter your password" />
                </div>
            </div>
            <button type="submit">Login</button>
            <p>Don't have an account? <a href="/register" className='text-[var(--secondary)]'>Register</a></p>
        </form>
    </div>
    </div>
  )
}

export default Login