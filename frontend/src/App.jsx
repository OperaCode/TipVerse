import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Landing from './pages/Landing';
import Home from './pages/Home';
import CreateForm from './pages/CreateForm';
import Projects from './pages/Projects';

function App() { const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/dashboard' element={<Home/>}/>
        <Route  path='/create' element={<CreateForm/>}/>
        <Route path='/projects' element={<Projects/>}/>
    
      </Routes>
    </>
  )
}

export default App
