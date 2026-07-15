import React from 'react'
import { Lock, Mail, Phone, User } from 'lucide-react'
const Register = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-10 bg-indigo-50'>
   
    <div>
        <p className='text-6xl font-bold text-[var(--accent)]'>E-<span className="text-[var(--secondary)]">Buy.</span></p>
    </div>
    <div className='max-w-2xl py-5 px-10 shadow bg-white min-w-sm'>
        <h1 className='text-2xl font-bold text-[var(--accent)] my-5'>Sign Up</h1>
        <form >
            <div className='grid grid-cols-2 gap-5'>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-1'>
                <label htmlFor="firstName">First Name</label>
                <div className='flex items-center relative bg-[var(--light-grey)] rounded-md px-3 focus-within:ring-2 focus-within:ring-[var(--secondary)]'>
                <User className='inline size-5' color='gray'/>
                <input className='w-full' type="text" name="firstName" id="firstName" required placeholder="Enter your First Name" />
                </div>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="lastName">Last Name</label>
                <div className='flex items-center relative bg-[var(--light-grey)] rounded-md px-3 focus-within:ring-2 focus-within:ring-[var(--secondary)]'>
                <User className='inline size-5' color='gray'/>
                <input className='w-full' type="text" name="lastName" id="lastName" required placeholder="Enter your Last Name" />
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="number">Phone Number</label>
                <div className='flex items-center relative bg-[var(--light-grey)] rounded-md px-3 focus-within:ring-2 focus-within:ring-[var(--secondary)]'>
                <Phone className='inline size-5' color='gray'/>
                <input className='w-full' type="text" name="number" id="number" required placeholder="Enter your phone number" />
                </div>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="username">Username</label>
                <div className='flex items-center relative bg-[var(--light-grey)] rounded-md px-3 focus-within:ring-2 focus-within:ring-[var(--secondary)]'>
                <User className='inline size-5' color='gray'/>
                <input className='w-full' type="text" name="username" id="username" required placeholder="Enter your username" />
                </div>
            </div>
            </div>
            <div className='flex flex-col gap-2'>
            
            <div className='flex flex-col gap-1'>
                <label htmlFor="email">Email</label>
                <div className='flex items-center relative bg-[var(--light-grey)] rounded-md px-3 focus-within:ring-2 focus-within:ring-[var(--secondary)]'>
                <Mail className='inline size-5' color='gray'/>
                <input className='w-full' type="email" name="email" id="email" required placeholder="Enter your email" />
                </div>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="password">Password</label>
                <div className='flex items-center relative bg-[var(--light-grey)] rounded-md px-3 focus-within:ring-2 focus-within:ring-[var(--secondary)]'>
                <Lock className='inline mr-2 size-5' color='gray'/>
                <input className='w-full' type="password" name="password" id="password" required placeholder="Enter your password" />
                </div>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="confirmpassword">Confirm Password</label>
                <div className='flex items-center relative bg-[var(--light-grey)] rounded-md px-3 focus-within:ring-2 focus-within:ring-[var(--secondary)]'>
                <Lock className='inline mr-2 size-5' color='gray'/>
                <input className='w-full' type="password" name="confirmpassword" id="confirmpassword" required placeholder="Confirm your password" />
                </div>
            </div>
            <button className= 'mt-7 row-span-1' type="submit">Sign Up →</button>
            </div>
            </div>
            <p className='text-center my-5'>Alerady have an account? <a href="/login" className='text-[var(--secondary)]'>Login</a></p>
        </form>
    </div>
    </div>
  )
}

export default Register