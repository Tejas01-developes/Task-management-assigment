import  { useContext, useEffect, useState } from 'react'
import { Authcontext } from '../Tokenhandelling'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Addtask = () => {
    const[field,setfield]=useState({title:"",description:""})
    const{getaccess,setaccess}=useContext(Authcontext)
    const[loading,setloading]=useState(true)
    const navigate=useNavigate()
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
         alert("task added")
       return navigate("/home")
    }else{
        return alert(res.data.message)
    }
        }catch(err){
      return  alert("task posting failed")
        }
    }
    
  return (
    <div className='taskparent'>
<div className='taskhead'>
    Add Tasks
</div>
<div className='taskbody'>
         <input type="text" placeholder='Title' name='title' value={field.title} onChange={handlefield} className='taskfield'/>

<textarea name="description" placeholder='Description' value={field.description} onChange={handlefield} className='taskfield'/>
<button onClick={addtask} className='taskbutton'>Add Task</button>
</div>


{/* {loading? <h1>loading...</h1>:token } */}
    </div>
  )
}

export default Addtask
