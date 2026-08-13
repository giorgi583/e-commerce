import React, {useEffect, useCallback} from 'react'
import placeholder from '../assets/placeholder_600x.webp'
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import ProductCard from './ProductCard';
const Slider = ({title, data}) => {
  const [current, setCurrent] = React.useState(0);
  const cardRef = React.useRef(null); 
  const containerRef = React.useRef(null);
  const [visibleCount, setVisibleCount] = React.useState(5);
  const [distance, setDistance] = React.useState(0);
const measure = useCallback(() => {
if(!containerRef.current || !cardRef.current) {
  return;
}
const cardWidth = cardRef.current.offsetWidth;
const gap = 16;
setDistance(cardWidth + gap);
const containerWidth = containerRef.current.offsetWidth;
const visibleCards = Math.floor(containerWidth / (cardWidth + gap));
setVisibleCount(visibleCards);
}, []);
useEffect(() => {
  measure();
  window.addEventListener('resize', measure);
  return () => {
    window.removeEventListener('resize', measure);
  };
}, [data, measure]);
useEffect(() => {
  const maxIndex = Math.max(0, data.length - visibleCount);
  if (current > maxIndex) {
    setCurrent(maxIndex);
  }
}, [current, data.length, visibleCount]);
if (!data || data.length === 0) {
  return null;
}
const maxIndex = Math.max(0, data.length - visibleCount);
const showArrows = data.length > visibleCount;
  return (
   data && <div className='max-w-7xl mx-auto relative overflow-hidden py-15'>
     <h1 className='text-2xl font-bold text-[var(--accent)] mb-10'>{title}</h1>
     <div ref={containerRef} className={`flex gap-4 relative items-stretch transition-all duration-300`} style={{transform: `translateX(-${current * distance}px )`}}>
        {data && data.map((product, index) => (
            <div ref={index === 0 ? cardRef : null} key={index} className={`rounded-xl basis-[calc((100%-4rem)/5)] max-lg:basis-[calc((100%-4rem)/4)] max-md:basis-[calc((100%-4rem)/3)] max-sm:basis-[calc((100%-4rem)/2)] shrink-0 flex flex-col h-full ${data.length <= 5 && 'min-w-60'}`}>
              <ProductCard id={product.id} name={product.name} rating={product.rating} price={product.discountedPrice} oldPrice={product.price} quantity={product.quantity} />
              </div>
        ))}
     </div>
   { showArrows &&  <><button onClick={() => setCurrent(c =>Math.max(current - 1, 0))} disabled={current === 0} className='absolute rounded-full top-1/2 left-0 w-13 h-13 p-0 px-0 py-0 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none'><ChevronLeft size={24}/></button>
        <button onClick={() => setCurrent(c => Math.min(current + 1, maxIndex))} disabled={current === maxIndex} className='absolute rounded-full top-1/2 right-0 w-13 p-0 px-0 py-0 h-13 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none'><ChevronRight size={24} /></button></> }
    </div>
  )
}

export default Slider