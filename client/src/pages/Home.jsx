import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Categories from '../components/Categories'
import Brands from '../components/Brands'
import Slider from '../components/Slider'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
const Home = () => {
  const apiURL = import.meta.env.VITE_API_URL;
  const [topSales, setTopSales] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const getTopProducts = async () => {
    try {
      const response = await fetch(`${apiURL}/products/top`);
      const result = await response.json();
      console.log(result);
      setTopSales(result.TopSales);
      setTopRated(result.topRatedProducts);
      setNewArrivals(result.recentlyAdded);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getTopProducts();
  }, [])
  return (
   (topSales.length > 0 && topRated.length > 0 && newArrivals.length > 0) && <>
        <Header />
        <main className='max-w-7xl mx-auto p-15'>
        <Categories />
        <Slider data={topSales} title={'Top Discounts'}/>
        <Slider data={newArrivals} title={'New Arrivals'}/>
        <Brands />
        <Slider data={topRated} title={'Top Rated'}/>
        </main>
        <Footer />
    </>
  )
}

export default Home