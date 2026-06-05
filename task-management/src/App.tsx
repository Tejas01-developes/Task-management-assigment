import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'
const App = () => {
  return (
    <div>
      <Routes>
<Route element={<Register/>} path='/register'/>

<Route element={<Login/>} path='/'/>


<Route element={<Home/>} path='/home'/>

      </Routes>
      
    </div>
  )
}

export default App
