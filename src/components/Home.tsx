import {useNavigate} from 'react-router-dom'

const Home = () => {
    const nav=useNavigate()
  return (
    <div className='flex justify-center items-center gap-4 text-white flex-col mt-[200px]'>
        <h1 className='text-5xl text-center'>Welcome to the Dungeons & Dragons SpellsDB</h1>
        <button className='text-2xl border border-[#666633] transition duration-500 hover:bg-white hover:text-[#666633] bg-[#666633] p-4 tracking-wider rounded-lg' onClick={()=>nav('/spells')}>Check the spells</button>
    </div>
  )
}

export default Home