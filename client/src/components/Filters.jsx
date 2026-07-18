import React, { useState, useEffect } from 'react'
import { Check, ChevronDown, Filter } from 'lucide-react'
const Filters = ({name, setName, checkedCategories, setCheckedCategories, brand, setBrand, minPrice, setMinPrice, maxPrice, setMaxPrice}) => {
  const MIN = 0;
  const MAX = 3000;
const left = ((minPrice - MIN) / (MAX - MIN)) * 100;
const right = ((maxPrice - MIN) / (MAX - MIN)) * 100;
const apiURL = import.meta.env.VITE_API_URL;
const [categories, setCategories] = React.useState([]);

const handleCheckCat = (category) => {
    if (checkedCategories.includes(category)) {
      setCheckedCategories(checkedCategories.filter((c) => c !== category));
    } else {
      setCheckedCategories([...checkedCategories, category]);
    }
}
const clearFilters = () => {
    setCheckedCategories([]);
    setBrand('');
    setMinPrice(0);
    setMaxPrice(3000);
}
const getCategories = async () => {
    try {
      const response = await fetch(`${apiURL}/products/categories`);
      const result = await response.json();
      setCategories(result.categories);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCategories();
  }, [])
  return (
    <div className='flex flex-col gap-2 p-5 rounded-2xl border border-gray-200 sticky top-40'>
        <div className='flex items-center justify-between'><h1 className='text-2xl font-bold'>Filters</h1>
         <Filter size={20}/><button  onClick={clearFilters}>clear all</button>
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
              <input type="number" className='w-full border border-gray-200 rounded-md p-2' value={minPrice}  min={MIN} max={maxPrice - 1} onInput={(e) => setMinPrice(Math.max(Math.min(Number(e.target.value), maxPrice - 1), MIN))} onInput={(e) => setMinPrice(e.target.value)}/>
              <input type="number" className='w-full border border-gray-200 rounded-md p-2' value={maxPrice}  min={minPrice + 1} max={MAX} onInput={(e) => setMaxPrice(Math.min(Math.max(Number(e.target.value), minPrice + 1), MAX))} onInput={(e) => setMaxPrice(e.target.value)}/>
            </div>
            </div>
            </div>
            <div className='flex flex-col gap-5 border-y border-gray-200 py-5'>
              <details>
              <summary className='flex items-center justify-between cursor-pointer text-xl font-bold'>Categories <ChevronDown size={20}/></summary>
              <ul className='flex flex-col gap-2 py-2'>
               {categories && categories.map((category, index) => <li key={index} className='flex items-center gap-2'><input type="checkbox" name={category.category} checked={checkedCategories.includes(category.category)} onChange={(e)=> handleCheckCat(category.category)} id={category.category} hidden /> 
                <div className={`cursor-pointer  w-4 h-4 rounded-full ${checkedCategories.includes(category.category) ? 'bg-[var(--secondary)]' : 'bg-[var(--light-grey)]'} border border-gray-200`}><label htmlFor={category.category} className='cursor-pointer w-full h-full flex items-center justify-center' >{checkedCategories.includes(category.category) && <Check size={10} color='white'/>}</label></div> <p>{category.category} </p></li>)}
              </ul>
            </details>
            </div>
            <div className='flex flex-col gap-5 border-y border-gray-200 py-5'>
              <details>
                <summary className='flex items-center justify-between cursor-pointer text-xl font-bold'>Brands <ChevronDown size={20}/></summary>
                <div className='flex flex-col gap-2 pt-8 py-2'>
                  <input type="text" placeholder='Search brands' value={brand} onChange={(e) => setBrand(e.target.value)} />
                </div>
              </details>
            </div>
            <div className='flex flex-col gap-5 border-y border-gray-200 py-5'>
              <details>
                <summary className='flex items-center justify-between cursor-pointer text-xl font-bold'>Product name <ChevronDown size={20}/></summary>
                <div className='flex flex-col gap-2 pt-8 py-2'>
                  <input type="text" placeholder='Search product name' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </details>
            </div>
        </div>
    </div>
  )
}

export default Filters