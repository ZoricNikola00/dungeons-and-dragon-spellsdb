import React from 'react'
import {useNavigate} from 'react-router-dom'
import {GiScrollQuill} from 'react-icons/gi'

export const Navbar = () => {
    const nav=useNavigate()

  return (
    <nav className='fixed top-0 left-0 w-full text-white z-10 bg-[#666633] shadow shadow-[#666633] py-3'>
        <div className='flex justify-between items-center w-[90%] md:w-[80%] mx-auto'>
            <h1 className='text-xl md:text-3xl font-bold cursor-pointer' onClick={()=>nav('/')}>Dungeons & Dragons SpellsDB</h1>
            <GiScrollQuill data-testid='icon' onClick={()=>nav('/favorite')} className='text-5xl cursor-pointer transition duration-300 hover:text-green-300/30'/>
        </div>
    </nav>
  )
}
