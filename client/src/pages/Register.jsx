import React, { useState } from 'react'
import { Eye, Lock, Mail, Phone, User } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
const Register = () => {
    const apiUrl = import.meta.env.VITE_API_URL
    const [error, setError] = useState(null);
    const [passwordScore, setPasswordScore] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    function getPasswordScore(password) {
        setPasswordScore(0);
        if (password.length > 7) {
            setPasswordScore(prevScore => prevScore + 1);
        }
        if (password.match(/[a-z]/)) {
            setPasswordScore(prevScore => prevScore + 1);
        }
        if (password.match(/[A-Z]/)) {
            setPasswordScore(prevScore => prevScore + 1);
        }
        if (password.match(/[0-9]/)) {
            setPasswordScore(prevScore => prevScore + 1);
        }
        if (password.match(/[^a-zA-Z0-9]/)) {
            setPasswordScore(prevScore => prevScore + 1);
        }
    }
    console.log(apiUrl);
    async function registerUser(event) {
        setError(null);
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        data.role = 'customer';
        console.log(data);
        if(passwordScore < 5) {
            setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return;
        }
        console.log(data.password, data.confirmPassword, data.password !== data.confirmPassword);
        if(data.password !== data.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
       const {confirmPassword, ...rest} = data;
       try {const response = await fetch(apiUrl + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rest)
        });
        const result = await response.json();
        console.log(result); 
        if(response.ok) {
            toast.success(result.message);
            setTimeout(() => {
                window.location.href = '/login';
            }, 1000);
        } else {
            throw new Error(result.message);
        }
    }
        catch (error) {
            toast.error(error.message);
        }
    }
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-10 bg-indigo-50'>
   
    <div>
        <Link to={'/'} className='text-6xl font-bold text-[var(--accent)]'>E-<span className="text-[var(--secondary)]">Buy.</span></Link>
    </div>
    <div className='max-w-2xl py-5 px-10 shadow bg-white min-w-sm'>
        <h1 className='text-2xl font-bold text-[var(--accent)] my-5'>Sign Up</h1>
        <form onSubmit={registerUser}>
            <div className='grid grid-cols-2 gap-5'>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-1 '>
                <label htmlFor="firstName">First Name</label>
                <div className='flex items-center relative bg-[var(--light-grey)] rounded-md focus-within:ring-2 focus-within:ring-[var(--secondary)]'>
                <User className='inline size-5 absolute left-3' color='gray'/>
                <input className='w-full px-10' type="text" name="firstName" id="firstName" required placeholder="Enter your First Name" />
                </div>
            </div>
            <div className='flex flex-col gap-1 '>
                <label htmlFor="lastName">Last Name</label>
                <div className='flex items-center relative bg-[var(--light-grey)] rounded-md focus-within:ring-2 focus-within:ring-[var(--secondary)]'>
                <User className='inline size-5 absolute left-3' color='gray'/>
                <input className='w-full px-10' type="text" name="lastName" id="lastName" required placeholder="Enter your Last Name" />
                </div>
            </div>
            <div className='flex flex-col gap-2 '>
                <label htmlFor="number">Phone Number</label>
                <div className='flex items-center relative bg-[var(--light-grey)] rounded-md focus-within:ring-2 focus-within:ring-[var(--secondary)]'>
                <Phone className='inline size-5 absolute left-3' color='gray'/>
                <input className='w-full px-10' type="text" name="contactNumber" id="number" required placeholder="Enter your phone number" />
                </div>
            </div>
            <div className='flex flex-col gap-1 '>
                <label htmlFor="username">Username</label>
                <div className='flex items-center relative bg-[var(--light-grey)] rounded-md focus-within:ring-2 focus-within:ring-[var(--secondary)]'>
                <User className='inline size-5 absolute left-3' color='gray'/>
                <input className='w-full px-10' type="text" name="username" id="username" maxLength={10} required placeholder="Enter your username" />
                </div>
            </div>
            </div>
            <div className='flex flex-col gap-2'>
            
            <div className='flex flex-col gap-1 '>
                <label htmlFor="email">Email</label>
                <div className='flex items-center relative bg-[var(--light-grey)] rounded-md focus-within:ring-2 focus-within:ring-[var(--secondary)]'>
                <Mail className='inline size-5 absolute left-3' color='gray'/>
                <input className='w-full px-10' type="email" name="email" id="email" required placeholder="Enter your email" />
                </div>
            </div>
            <div className='flex flex-col gap-1 '>
                <label htmlFor="password">Password</label>
                <div className='flex items-center relative bg-[var(--light-grey)] rounded-md focus-within:ring-2 focus-within:ring-[var(--secondary)]'>
                <Lock className='inline mr-2 size-5 absolute left-3' color='gray'/>
                <input onChange={(e) => getPasswordScore(e.target.value)} className='w-full px-10' type={showPassword ? "text" : "password"} name="password" id="password" required placeholder="Enter your password" />
                <Eye onClick={()=> setShowPassword(!showPassword)} className='inline size-5 cursor-pointer absolute right-3' color='gray'/>
                </div>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="confirmpassword">Confirm Password</label>
                <div className='flex items-center relative bg-[var(--light-grey)] rounded-md focus-within:ring-2 focus-within:ring-[var(--secondary)]'>
                <Lock  className='inline mr-2 size-5 absolute left-3' color='gray'/>
                <input className='w-full px-10' type={showConfirmPassword ? "text" : "password"} name="confirmPassword" id="confirmpassword" required placeholder="Confirm your password" />
                <Eye onClick={()=> setShowConfirmPassword(!showConfirmPassword)} className='inline size-5 cursor-pointer absolute right-3' color='gray'/>
                </div>
            </div>
           {passwordScore>0 && <div className='h-1 w-full bg-[var(--light-grey)] mt-3 -mb-5 rounded-2xl relative'><div style={{width: `${(passwordScore/5)*100}%`, backgroundColor: `${passwordScore < 3 ? 'red' : `${passwordScore < 5 ? 'orange' : 'lime'}`}`}} className='absolute top-0 left-0 h-1 rounded-2xl transition-all duration-300'></div></div>}
            <button className= 'mt-7 row-span-1' type="submit">Sign Up →</button>
            </div>
            </div>
           {error && <p className='text-red-600 mt-5'>{error}</p>}
            <p className='text-center my-5'>Alerady have an account? <a href="/login" className='text-[var(--secondary)]'>Login</a></p>
        </form>
    </div>
    </div>
  )
}

export default Register