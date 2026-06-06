import  { use, useContext, useEffect, useState } from 'react'
import { Authcontext } from '../Tokenhandelling'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate=useNavigate()
    const{getaccess}=useContext(Authcontext)
    const{setaccess}=useContext(Authcontext)
    const token=getaccess()
const[field,setfield]=useState({title:"",description:""})
const[loading,setloading]=useState(true)
const[tasks,settasks]=useState([])

const handlefield=(e)=>{
    setfield({
        ...field,[e.target.name]:e.target.value
    })
}
useEffect(()=>{
    const handlepage=async()=>{
        // if(token){
        //   return  setloading(false)
        // }
        try{
            const res=await axios.post("http://localhost:3000/apis/refresh",{},{withCredentials:true})
            if(res.data.success){
                 setaccess(res.data.access) 
                 return getalltsk(res.data.access)
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


const getalltsk=async(activetoken)=>{
    if(!activetoken) return
    try{
    const res=await axios.get("http://localhost:3000/apis/fetch",{headers:{Authorization:`Bearer ${activetoken}`}}) 
    if(res.data.success){
        return settasks(res.data.result)
    }
    return alert(res.data.message)
}catch(err){
alert("task fetch failed")
}
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
  {loading? <h1>Loading.....</h1> : token}
 
   <input type="text" placeholder='Title' name='title' value={field.title} onChange={handlefield}/>

   <textarea name="description" placeholder='Description' value={field.description} onChange={handlefield}/>
   <button onClick={addtask}>Add Task</button>

{tasks.map((i,key)=>(
<div key={key}>
{i.title}
{i.description}
{i.status}
</div>
))}

    </div>
  )
}

export default Home
