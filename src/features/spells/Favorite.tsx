import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/spellHooks'
import {TiTimes} from 'react-icons/ti'
import {GiScrollUnfurled} from 'react-icons/gi'
import { addFavorite } from './spellSlice'

const Favorite = () => {
  const {favorite}=useAppSelector(state=>state.spells)
  const dispatch=useAppDispatch()
  const nav=useNavigate()
  
  if(favorite?.length===0){
    return (
    <div className='text-center text-white'>
      <h1 className='text-5xl my-[40px]'>You don&apos;t have any favorite spell!</h1>
      <button className='text-2xl border border-[#666633] transition duration-500 hover:bg-white hover:text-[#666633] bg-[#666633] p-4 tracking-wider rounded-lg' onClick={()=>nav('/spells')}>Check the spells</button>
    </div>
    )
  }
  return (
    <div className='w-[90%] md:w-[80%] mx-auto text-white'>
      <div className='flex items-center justify-between'>
        <h1 className='text-4xl font-bold'>My Favorite Spells</h1>
        <button className='text-lg px-2 border border-[#666633] transition duration-500 hover:bg-white hover:text-[#666633] bg-[#666633] py-1 tracking-wider rounded-lg' onClick={()=>nav('/spells')}>Check other spells</button>
      </div>
      <div className='grid w-full grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 p-4 mt-6'>
        <div className='col-span-1'>Level: </div>
        <div className='col-span-2'>Name: </div>
        <div className='col-span-1 hidden sm:block'>Casting: </div>
        <div className='col-span-1 hidden sm:block'>Duration: </div>
        <div className='col-span-1 hidden md:block'>Range/Area: </div>
        <div className='col-span-1 hidden lg:block'>Attack: </div>
        <div className='col-span-1 hidden xl:block'>Damage: </div>
      </div>
      {favorite?.map((spell)=>(
        <div key={spell.index} className='relative items-center w-full mb-3 text-lg font-bold bg-green-300/30 rounded p-4 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8'>
          <div className='col-span-1'>{spell.level}</div>
          <div className='col-span-2'>{spell.name}</div>
          <div className='col-span-1 hidden sm:block'>{spell.casting_time}</div>
          <div className='col-span-1 hidden sm:block'>{spell.duration}</div>
          <div className='col-span-1 hidden md:block'>{spell.range}</div>
          <div className='col-span-1 hidden lg:block'>{spell.attack_type || '/'}</div>
          <div className='col-span-1 hidden xl:block'>{spell?.damage?.damage_type.name || '/'}</div>
          <button data-testid='remove' onClick={()=>dispatch(addFavorite(favorite.find(fav=>fav.index===spell.index)))} className='absolute text-3xl right-[20px] z-30 hover:text-red-500 duration-500 transition'><TiTimes/></button>
          <button onClick={()=>nav(`/spells/${spell.index}`)} className='absolute text-3xl right-[60px] z-30 hover:text-[#666633] transition duration-500'><GiScrollUnfurled/></button>
        </div>
      ))}
    </div>
  )
}

export default Favorite