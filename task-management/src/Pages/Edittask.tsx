import axios from 'axios'
import  { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Authcontext } from '../Tokenhandelling'




const Edittask = () => {
    const[fields,setfields]=useState({taskid:"",title:"",description:""})
const[loading,setloading]=useState(true)
const navigate=useNavigate()
const{setaccess,getaccess}=useContext(Authcontext)
const token=getaccess()
useEffect(()=>{
const handlepage=async()=>{
    // if(token){
    //   return  setloading(false)
    // }
    try{
        const res=await axios.post("http://localhost:3000/apis/refresh",{},{withCredentials:true})
        if(res.data.success){
           return  setaccess(res.data.access) 
            
        }
            alert("refresh filter failed")
            return navigate("/")
        
    }catch(err){
        alert("session loading failed")
        return navigate("/")
    }finally{
        setloading(false)
    }
}
handlepage()
},[])


const handlefield=(e)=>{
    setfields({
        ...fields,[e.target.name]:e.target.value
    })
}


const edittask=async()=>{
    if(!fields.taskid){
        return alert("fill up the taskid to update task")
    }
    try{
const res=await axios.patch("http://localhost:3000/apis/update-task",fields,{headers:{Authorization:`Bearer ${token}`}})
if(res.data.success){
    alert("task updated")
    return navigate("/home")
}
return alert(res.data.message)
    }catch(err){
        alert("task update failed")
    }
}




  return (
    <div className='taskparent'>
        <div className='taskhead'>
            Update Task
        </div>
        <div className='taskbody'>
      <input type="text" placeholder='Task id' name='taskid' value={fields.taskid} onChange={handlefield}  className='taskfield'/>
      <input type="text" placeholder='Update Title' name='title' value={fields.title} onChange={handlefield} className='taskfield' />
      <textarea name="description" placeholder='Update Description' value={fields.description} onChange={handlefield} className='taskfield'/>
      <button onClick={edittask} className='taskbutton'>Edit</button>
      </div>
    </div>
  )
}

export default Edittask
