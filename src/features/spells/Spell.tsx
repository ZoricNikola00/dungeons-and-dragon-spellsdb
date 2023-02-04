import { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/spellHooks'
import { addFavorite, getSpell } from './spellSlice'
import { RingLoader } from 'react-spinners'
import {FaHeart} from 'react-icons/fa'
import {ImArrowLeft} from 'react-icons/im'
import {useNavigate} from 'react-router-dom'

const Spell = () => {
    const {id}=useParams()
    const {spell,isLoading, favorite}=useAppSelector(state=>state.spells)
    const dispatch=useAppDispatch()
    const nav=useNavigate()
    const checkFavorite=favorite?.some(favorite=>favorite.index===spell?.index)
    const styledItem={div:'col-span-1 border border-white p-1 rounded', span:'text-sm text-gray-300',br:'block md:hidden'}
    useEffect(()=>{
        dispatch(getSpell(id))
    },[])

    if(isLoading){
        return <RingLoader color='#666633' size={150} className='my-[200px] w-[full] mx-auto'/>
    }
  return (
    <div className='relative w-[90%] md:w-[80%] bg-green-300/30 rounded p-4 text-white mx-auto my-[100px]'>
        <button onClick={()=>nav('/spells')} className='flex items-center gap-2 text-lg text-gray-300 italic p-2 border border-transparent rounded transition duration-300 hover:border-gray-300'><ImArrowLeft/> Back</button>
        <div className='flex items-center justify-between text-4xl py-2'>
            <h1 className='font-bold'>{spell?.name}</h1>
            <button onClick={_=>dispatch(addFavorite(spell))}><FaHeart className={`${checkFavorite?'text-[#666633]':'text-white/30'} transition duration-500`}/></button>
        </div>
        <hr/>
        <div className='text-sm md:text-lg grid grid-cols-2 md:grid-cols-4 p-4 gap-2'>
            <div className={styledItem.div}><span className={styledItem.span}>Level: </span><br className={styledItem.br}/>{spell?.level}</div>
            <div className={styledItem.div}><span className={styledItem.span}>Components: </span><br className={styledItem.br}/>{spell?.components.map((comp,i)=><span key={i} className='mr-1'>{comp}</span>)}</div>
            <div className={styledItem.div}><span className={styledItem.span}>Range: </span><br className={styledItem.br}/>{spell?.range||'/'}</div>
            <div className={styledItem.div}><span className={styledItem.span}>Classes: </span><br className={styledItem.br}/>{spell?.classes.map(clas=><span key={clas.index} className='mr-1'>{clas.name}</span>)}</div>
            <div className={styledItem.div}><span className={styledItem.span}>Casting Time: </span><br className={styledItem.br}/>{spell?.casting_time}</div>
            <div className={styledItem.div}><span className={styledItem.span}>Concetration: </span><br className={styledItem.br}/>{spell?.concetration?"NO":"YES"}</div>
            <div className={styledItem.div}><span className={styledItem.span}>Duration: </span><br className={styledItem.br}/>{spell?.duration}</div>
            <div className={styledItem.div}><span className={styledItem.span}>Type of attack: </span><br className={styledItem.br}/>{spell?.attack_type|| '/'}</div>
            <div className={styledItem.div}><span className={styledItem.span}>Material: </span><br className={styledItem.br}/>{spell?.material || '/'}</div>
            <div className={styledItem.div}><span className={styledItem.span}>Damage: </span><br className={styledItem.br}/>{spell?.damage?.damage_type_name || '/'}</div>
            <div className={styledItem.div}><span className={styledItem.span}>School: </span><br className={styledItem.br}/>{spell?.school.name}</div>
            <div className={styledItem.div}><span className={styledItem.span}>Ritual: </span><br className={styledItem.br}/>{spell?.ritual?"YES":"NO"}</div>
        </div>
        <hr/>
        <div className='p-1'>
            <h1 className='font-semibold'>Description: </h1>
            <div className='p-2'>
                {spell?.desc.map((des,i)=><p key={i} className='mb-3'>{des}</p>)}
            </div>
        </div>
        <div className={`${spell?.higher_level?.length?'block':'hidden'} p-1`}>
            <h1 className='font-semibold'>Higher level description: </h1>
            <div className='p-2'>
                {spell?.higher_level?.map((des,i)=><p key={i}>{des}</p>)}
            </div>
        </div>
    </div>
  )
}

export default Spell