import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
const[field,setfield]=useState({name:"",email:"",password:""})
const navigate=useNavigate()
const handlefield=(e)=>{
setfield({
...field,[e.target.name]:e.target.value
})
}


 const register=async()=>{
if(!field.name || !field.email || !field.password){
    return alert("fill all the fields")
}
try{
    const res=await axios.post("http://localhost:3000/apis/register",field)
    if(res.data.success){
        alert(res.data.message)
        navigate("/")
        return
    }else{
        alert(res.data.message)
        return
    }
}catch(err){
alert("Registration failed")
}
}

  return (
    <div>
      <input type="text" placeholder='Name' name='name'  value={field.name}  onChange={handlefield}/>
      <input type="text" placeholder='Email' name='email' value={field.email} onChange={handlefield} />
      <input type="password" placeholder='Password' name='password' value={field.password} onChange={handlefield} />
      <button onClick={register}>Register</button>
    </div>
  )
}

export default Register
