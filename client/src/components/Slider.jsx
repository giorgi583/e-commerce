import React, {useEffect} from 'react'
import placeholder from '../assets/placeholder_600x.webp'
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import ProductCard from './ProductCard';
const Slider = ({title, data}) => {
  const [current, setCurrent] = React.useState(0);
  const cardRef = React.useRef(null); 
  const [distance, setDistance] = React.useState(0);
useEffect(() => {
   if (!cardRef.current) return;
  setDistance(cardRef.current.offsetWidth + 16);
  console.log(distance, cardRef.current.offsetWidth, current);
}, [data]);
  return (
   data && <div className='max-w-7xl mx-auto relative overflow-hidden py-15'>
     <h1 className='text-2xl font-bold text-[var(--accent)] mb-10'>{title}</h1>
     <div className={`flex gap-4 relative items-stretch transition-all duration-300`} style={{transform: `translateX(-${current * distance}px )`}}>
        {data && data.map((product, index) => (
            <div ref={index === 0 ? cardRef : null} key={index} className={`rounded-xl basis-[calc((100%-4rem)/5)] max-lg:basis-[calc((100%-4rem)/4)] max-md:basis-[calc((100%-4rem)/3)] max-sm:basis-[calc((100%-4rem)/2)] shrink-0 flex flex-col h-full ${data.length <= 5 && 'min-w-60'}`}>
              <ProductCard id={product.id} name={product.name} rating={product.rating} price={product.discountedPrice} oldPrice={product.price} quantity={product.quantity} />
              </div>
        ))}
     </div>
   { data.length > 5 &&  <><button onClick={() => setCurrent(current - 1)} disabled={current === 0} className='absolute rounded-full top-1/2 left-0 w-13 h-13 p-0 px-0 py-0 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none'><ChevronLeft size={24}/></button>
        <button onClick={() => setCurrent(current + 1)} disabled={current === data.length - 5} className='absolute rounded-full top-1/2 right-0 w-13 p-0 px-0 py-0 h-13 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none'><ChevronRight size={24} /></button></> }
    </div>
  )
}

export default Slider