import { useState } from 'react'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <HashRouter>
        
        <Routes>
          
          <Route path='/' element={<Home/>} />
        
        </Routes>
      
      </HashRouter>
      
    </>
  )
}

export default App
