import React from 'react'
import Background from './components/Background'
import { Navbar } from './components/Navbar'

const App = () => {
  return (
    <main className='w-full mt-[100px]'>
      <Navbar/>
      <Background/>
    </main>
  )
}

export default App