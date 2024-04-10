import { useState } from 'react'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import Shelf from './Components/Shelf';
import Chats from './Components/Chats';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <HashRouter>
        
        <Routes>
          
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/login' element={<LogIn/>} />
          <Route path='/shelf' element={<Shelf/>} />
          <Route path='/chats' element={<Chats/>} />
        
        </Routes>
      
      </HashRouter>
      
    </>
  )
}

export default App
