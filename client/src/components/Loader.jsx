import React from 'react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-1000 bg-black/20'>
       <div > <svg className='spinner' width="64" height="64" viewBox="0 0 66 66">
  <circle stroke-dasharray="176" stroke-dashoffset="120" cx="33" cy="33" r="28" fill="none" stroke="#835aff" stroke-width="6" stroke-linecap="round" />
</svg>
</div>
    </div>
  )
}

export default Loader