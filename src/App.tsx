import {Route,Routes} from 'react-router-dom'
import Background from './components/Background'
import Home from './components/Home'
import { Navbar } from './components/Navbar'
import Favorite from './features/spells/Favorite'
import Spell from './features/spells/Spell'
import Spells from './features/spells/Spells'

const App = () => {
  return (
    <main className='w-full mt-[100px]'>
      <Navbar/>
      <Background/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/spells' element={<Spells/>}/>
        <Route path='/spells/:id' element={<Spell/>}/>
        <Route path='/favorites' element={<Favorite/>}/>
      </Routes>
    </main>
  )
}

export default App