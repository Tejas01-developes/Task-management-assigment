import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Authcontext } from '../Tokenhandelling'


const Login = () => {
    const[field,setfield]=useState({email:"",password:""})
    const{setaccess}=useContext(Authcontext)
    const navigate=useNavigate()
    const handlefield=(e)=>{
        setfield({
        ...field,[e.target.name]:e.target.value
        })
        }

const loginuser=async()=>{
    if(!field.email || !field.password){
        return alert("fill all the fieds")
    }

    try{
        const res=await axios.post("http://localhost:3000/apis/login",field,{withCredentials:true})
        if(res.data.success){
            alert(res.data.message)
            navigate("/home")
            setaccess(res.data.access)
            
            return
        }else{
            return alert(res.data.message)
        } 
    }catch(err){
        return alert("Login failed")
    }
}


  return (
    <div className='loginparent'>
     <div className='loginhead'>
        Login user
     </div>
     <div className='loginbody'>
      <input type="text" name='email' placeholder='Email' value={field.email} onChange={handlefield} className='loginfields' />
      <input type="password" name='password' placeholder='Password' value={field.password} onChange={handlefield} className='loginfields'/>
      <button onClick={loginuser} className='loginbutton'>Login</button>
      </div>
    </div>
  )
}

export default Login
