import  { useContext, useState } from 'react'
import { Authcontext } from '../Tokenhandelling'
import axios from 'axios'

const Home = () => {
    const{getaccess}=useContext(Authcontext)
    const token=getaccess()
const[field,setfield]=useState({title:"",description:""})

const handlefield=(e)=>{
    setfield({
        ...field,[e.target.name]:e.target.value
    })
}


const addtask=async()=>{
    if(!field.title || !field.description){
        return alert("fill all the fields")
    }
    try{
const res=await axios.post("http://localhost:3000/apis/posttask",field,{
    headers:{Authorization:`Bearer ${token}`}
})
if(res.data.success){
    return alert("task added")
}else{
    return alert(res.data.message)
}
    }catch(err){
  return  alert("task posting failed")
    }
}



  return (
    <div>
   <h1>{token}</h1>
 
   <input type="text" placeholder='Title' name='title' value={field.title} onChange={handlefield}/>

   <textarea name="description" placeholder='Description' value={field.description} onChange={handlefield}/>
   <button onClick={addtask}>Add Task</button>
    </div>
  )
}

export default Home
