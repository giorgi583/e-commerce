import React, { useState } from 'react'
import { Check, ChevronDown, Filter } from 'lucide-react'
const Filters = () => {
  const MIN = 0;
  const MAX = 3000;
  const [minPrice, setMinPrice] = useState(100);
const [maxPrice, setMaxPrice] = useState(2800);
const [checked, setChecked] = useState(false);
const left = ((minPrice - MIN) / (MAX - MIN)) * 100;
const right = ((maxPrice - MIN) / (MAX - MIN)) * 100;
  return (
    <div className='flex flex-col gap-2 p-5 rounded-2xl border border-gray-200'>
        <div className='flex items-center justify-between'><h1 className='text-2xl font-bold'>Filters</h1>
         <Filter size={20}/><button>clear all</button>
        </div>
        <div>
            <div className="flex flex-col gap-5 border-y border-gray-200 py-5">
              <h2 className="text-xl font-bold">Price</h2>
            <div className="relative w-full">
              <div className="h-2 rounded bg-gray-300" />
<div
    className="absolute top-0 h-2 bg-[var(--secondary)] rounded"
    style={{
      left: `${left}%`,
      width: `${right - left}%`,
    }}
  />

              <input
    type="range"
    min={MIN}
    max={MAX}
    value={minPrice}
    onChange={(e) =>
      setMinPrice(Math.min(Number(e.target.value), maxPrice - 1))
    }
    className="absolute w-full h-2 top-0 appearance-none bg-transparent p-0"
  />

  <input
    type="range"
    min={MIN}
    max={MAX}
    value={maxPrice}
    onChange={(e) =>
      setMaxPrice(Math.max(Number(e.target.value), minPrice + 1))
    }
    className="absolute w-full h-2 top-0 appearance-none bg-transparent p-0"
  />
  
            </div>
            <div>
            <div className='flex items-center justify-between'>
            <p className='text-sm font-semibold'>From: ${minPrice}</p>
          
            <p className='text-sm font-semibold'>To: ${maxPrice}</p>
            </div>
            <div className='flex items-center gap-2 my-3'>
              <input type="number" className='w-full border border-gray-200 rounded-md p-2' value={minPrice}  min={MIN} max={maxPrice - 1} onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 1))} onInput={(e) => setMinPrice(e.target.value)}/>
              <input type="number" className='w-full border border-gray-200 rounded-md p-2' value={maxPrice}  min={minPrice + 1} max={MAX} onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 1))} onInput={(e) => setMaxPrice(e.target.value)}/>
            </div>
            </div>
            </div>
            <div className='flex flex-col gap-5 border-y border-gray-200 py-5'>
              <details>
              <summary className='flex items-center justify-between cursor-pointer text-xl font-bold'>Categories <ChevronDown size={20}/></summary>
              <ul className='flex flex-col gap-2 py-2'>
                <li className='flex items-center gap-2'><input type="checkbox" name="category1" checked={checked} onChange={(e)=> setChecked(e.target.checked)} id="category1" hidden /> 
                <div className={`cursor-pointer  w-4 h-4 rounded-full ${checked ? 'bg-[var(--secondary)]' : 'bg-[var(--light-grey)]'} border border-gray-200`}><label htmlFor="category1" className='cursor-pointer w-full h-full flex items-center justify-center' >{checked && <Check size={10} color='white'/>}</label></div> <p>Category 1</p></li>
                <li>Category 2</li>
                <li>Category 3</li>
              </ul>
            </details>
            </div>
            <div>
              <h2>Brands</h2>
            </div>
        </div>
    </div>
  )
}

export default Filters