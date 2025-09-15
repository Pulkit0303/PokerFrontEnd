import React from 'react'

function NavBar({ heading = "GroupName", onClick }) {
  return (
    <div className='relative flex w-full items-center h-11 md:h-16 text-black'>
        <button className='absolute left-0 flex text-xl' onClick={onClick}>
            <img src="/back.svg" alt="" className='w-10 h-10 md:w-12 md:h-12' />
        </button>
        <h1 className='absolute left-1/2 transform -translate-x-1/2 text-xl md:text-3xl font-bold'>
            {heading}
        </h1>
    </div>
  )
}

export default NavBar