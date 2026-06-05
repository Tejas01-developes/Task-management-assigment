import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Register from './Pages/Register'
const App = () => {
  return (
    <div>
      <Routes>
<Route element={<Register/>} path='/register'/>

      </Routes>
      
    </div>
  )
}

export default App
