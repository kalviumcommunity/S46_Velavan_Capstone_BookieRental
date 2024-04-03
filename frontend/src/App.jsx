import { useState } from 'react'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import SignUp from './Components/SignUp';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <HashRouter>
        
        <Routes>
          
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<SignUp/>} />
        
        </Routes>
      
      </HashRouter>
      
    </>
  )
}

export default App
