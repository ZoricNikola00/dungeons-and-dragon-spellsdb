import {Route,Routes} from 'react-router-dom'
import Background from './components/Background'
import Home from './components/Home'
import { Navbar } from './components/Navbar'
import Spells from './features/spells/Spells'

const App = () => {
  return (
    <main className='w-full mt-[100px]'>
      <Navbar/>
      <Background/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/spells' element={<Spells/>}/>
      </Routes>
    </main>
  )
}

export default App