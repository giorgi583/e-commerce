import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {useSearchParams} from 'react-router-dom'

const CompareProducts = () => {
  const [searchParams] = useSearchParams();
  const id1 = searchParams.get('id1');
  const id2 = searchParams.get('id2');
console.log(id1, id2)
  return (
    <>
      <Header />
    <div className='max-w-7xl mx-auto py-15 px-10'>
      <div>Compare Products</div>
      <div>{id1} vs {id2}</div>
    </div>
      <Footer />
    </>
  )
}

export default CompareProducts