import React from 'react'

import { FaUserCircle } from "react-icons/fa"

const Header = () => {
  return (
    <div className='w-full bg-[#4E73DF] p-[25px] flex items-center'>
        <div className='w-[50%]'>
            <h1 className='text-white text-[20px] leading[24px] font-extrabold'>Sistema</h1>
        </div>
        <div className='w-[50%] flex items-center justify-end mr-6 gap-2'>
            <p>Usuario</p>
            <FaUserCircle className='text-white text-3xl' />
        </div>
    </div>
  )
}

export default Header