import React, { useState } from 'react'
const letters=['#','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'Z']
import {FaSearch} from 'react-icons/fa'

const Spells = () => {
    const [letter, setLetter]=useState('#')
    const [query, setQuery]=useState('')
    const [header, setHeader]=useState('All Spells')
    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault()
    }
  return (
    <div className='w-[90%] md:w-[80%] mx-auto mt-[100px]'>
        <div className='my-[20px] flex flex-wrap justify-center w-full text-white'>
            {letters.map((lett,i)=><div key={i} onClick={()=>{setQuery('');setLetter(lett);setHeader(lett==='#'?'All spells':`All spells on letter: ${lett}`)}} className='text-lg py-1 px-2 rounded font-bold transition duration-300 cursor-pointer hover:bg-[#666633]/60'>{lett}</div>)}
        </div>
        <form onSubmit={handleSubmit} className='w-[200px] mx-auto relative'>
            <input placeholder='Search for spell...' className='w-full p-2 outline-none rounded bg-[#666633]/60 text-white' type='text' />
            <button type='submit' className='text-white absolute translate-y-[-50%] top-[50%] right-1'><FaSearch /></button>
        </form>
        <h1 className='text-center text-white text-4xl my-[20px]'>{header}</h1>
        <div>

        </div>
    </div>
  )
}

export default Spells