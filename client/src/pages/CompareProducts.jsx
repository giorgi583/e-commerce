import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {useParams} from 'react-router-dom'

const CompareProducts = () => {
  const {id1, id2} = useParams()
console.log(id1, id2)
  return (
    <div className='max-w-7xl mx-auto py-15 px-10'>
      <Header />
      <div>Compare Products</div>
      <Footer />
    </div>
  )
}

export default CompareProducts