
import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='bg-linear-90 from-[var(--secondary)]/30 to-[var(--secondary)]/10 '>
    <div className='max-w-7xl mx-auto pt-10'>
        <div className='grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 py-10'>
        <div>
            <h2 className='text-2xl font-bold text-[var(--accent)]'>E-<span className="text-[var(--secondary)]">Buy.</span></h2>
            <p className='mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, ullam nihil. Sint, similique officiis voluptatibus, quibusdam animi eaque quasi nihil molestiae.</p>
        </div>
        <div>
            <h3 className='text-xl font-bold text-[var(--accent)]'>Contact</h3>
            <p className='mt-5'>Telephone: +1 (123) 456-7890</p>
            <p className='mt-3'>Email: ebay@info.com</p>
            <p className='mt-3'>Address: 123 Main St, Anytown, USA</p>
        </div>
        <div>
            <h3 className='text-xl font-bold text-[var(--accent)]'>Information</h3>
            <p className='mt-5'>FAQ</p>
            <p className='mt-3'>Terms & Conditions</p>
            <p className='mt-3'>Privacy Policy</p>
            <p className='mt-3'>Shipping & Delivery</p>
        </div>
        <div>
            <h3 className='text-xl font-bold text-[var(--accent)]'>Follow us</h3>
            <p className='mt-5 flex gap-2 items-center'>Facebook <FaFacebook/></p>
            <p className='mt-3 flex gap-2 items-center'>Twitter <FaTwitter/></p>
            <p className='mt-3 flex gap-2 items-center'>Instagram <FaInstagram/></p>
            <p className='mt-3 flex gap-2 items-center'>Linkedin <FaLinkedin/></p>
        </div>
        </div>
        <div className='text-center border-t border-gray-400 py-5'>
            <p>2026 E-Buy. © All rights reserved</p>
        </div>
    </div>
    </footer>
  )
}

export default Footer