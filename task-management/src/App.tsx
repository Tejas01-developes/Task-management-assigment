import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Addtask from './Pages/Addtask'
const App = () => {
  return (
    <div>
      <Routes>
<Route element={<Register/>} path='/register'/>

<Route element={<Login/>} path='/'/>


<Route element={<Home/>} path='/home'/>


<Route element={<Addtask/>} path='/addtask'/>

      </Routes>
      
    </div>
  )
}

export default App
