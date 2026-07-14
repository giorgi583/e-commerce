import React from 'react'
import Header from '../components/Header'
import Categories from '../components/Categories'
import Brands from '../components/Brands'
import Slider from '../components/Slider'
import Footer from '../components/Footer'
const Home = () => {
  return (
    <>
        <Header />
        <main className='max-w-7xl mx-auto p-15'>
        <Categories />
        <Slider title={'Top Sales'}/>
        <Slider title={'New Arrivals'}/>
        <Brands />
        <Slider title={'Best Sellers'}/>
        </main>
        <Footer />
    </>
  )
}

export default Home