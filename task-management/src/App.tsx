import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Addtask from './Pages/Addtask'
import Edittask from './Pages/Edittask'
const App = () => {
  return (
    <div>
      <Routes>
<Route element={<Register/>} path='/register'/>

<Route element={<Login/>} path='/'/>


<Route element={<Home/>} path='/home'/>


<Route element={<Addtask/>} path='/addtask'/>

<Route path='/edit-task' element={<Edittask/>}/>

      </Routes>
      
    </div>
  )
}

export default App
