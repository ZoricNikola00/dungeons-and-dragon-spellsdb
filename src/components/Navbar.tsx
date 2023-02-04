import React from 'react'
import {GiScrollQuill} from 'react-icons/gi'

export const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 w-full text-white z-10 bg-[#666633] shadow shadow-[#666633] py-4 '>
        <div className='flex justify-between items-center w-[90%] md:w-[80%] mx-auto'>
            <h1 className='text-xl md:text-3xl font-bold cursor-pointer'>Dungeons & Dragons SpellsDB</h1>
            <GiScrollQuill className='text-4xl'/>
        </div>
    </nav>
  )
}
