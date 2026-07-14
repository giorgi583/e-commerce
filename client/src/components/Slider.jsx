import React, {useEffect} from 'react'
import placeholder from '../assets/placeholder_600x.webp'
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
const Slider = ({title}) => {
  const [current, setCurrent] = React.useState(0);
  const cardRef = React.useRef(null); 
  const [distance, setDistance] = React.useState(0);
useEffect(() => {
  setDistance(cardRef.current.offsetWidth + 16);
  console.log(distance, cardRef.current.offsetWidth, current);
}, [current]);
  return (
    <div className='max-w-7xl mx-auto relative overflow-hidden py-15'>
     <h1 className='text-2xl font-bold text-[var(--accent)] mb-10'>{title}</h1>
     <div className={`flex gap-4 relative transition-all duration-300`} style={{transform: `translateX(-${current * distance}px )`}}>
        {Array.from({length: 10}, (_, index) => (
            <div ref={cardRef} key={index} className={`rounded-xl basis-[calc((100%-4rem)/5)] max-lg:basis-[calc((100%-4rem)/4)] max-md:basis-[calc((100%-4rem)/3)] max-sm:basis-[calc((100%-4rem)/2)] shrink-0 bg-gray-50 p-3 flex flex-col gap-4 items-start`}>
              <div><img src={placeholder} alt="product image"/></div> 
              <h2>Product {index + 1}</h2> 
              <p>price: 100$</p>
              <button className='flex items-center gap-2'>+<ShoppingCart size={20}/></button>
              </div>
        ))}
     </div>
        <button onClick={() => setCurrent(current - 1)} disabled={current === 0} className='absolute rounded-full top-1/2 left-0 w-15 h-15 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none'><ChevronLeft size={24}/></button>
        <button onClick={() => setCurrent(current + 1)} disabled={current === 10-5} className='absolute rounded-full top-1/2 right-0 w-15 h-15 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none'><ChevronRight size={24} /></button>
    </div>
  )
}

export default Slider