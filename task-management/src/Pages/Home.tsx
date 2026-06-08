import  { useContext, useEffect, useState } from 'react'
import { Authcontext } from '../Tokenhandelling'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate=useNavigate()
    const{getaccess,setaccess}=useContext(Authcontext)
    const[id,setid]=useState()
    const token=getaccess()

const[loading,setloading]=useState(true)
const[tasks,settasks]=useState([])
const[page,setpage]=useState(1)
const[hasmore,sethasmore]=useState(true)
const[checkedfilter,setcheckedfilter]=useState("")
const[search,setsearch]=useState("")



// function for the refresh
useEffect(()=>{
    const handlepage=async()=>{
        // if(token){
        //   return  setloading(false)
        // }
        try{
            const res=await axios.post("http://localhost:3000/apis/refresh",{},{withCredentials:true})
            if(res.data.success){
                setid(res.data.id)
                return setaccess(res.data.access) 

                 
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
    if(!getaccess()){
        handlepage()
    }else{
        setloading(false)
    }
    
},[])

//function for the getting the task
const getalltsk=async(activetoken:string,currentpage:number)=>{
    if(!activetoken) return
    try{
    const res=await axios.get(`http://localhost:3000/apis/fetch?page=${currentpage}&search=${search}&status=${checkedfilter}`,{headers:{Authorization:`Bearer ${activetoken}`}}) 
    if(res.data.success){
         settasks(res.data.result)
        // if(res.data.result.lenght === 0){
        //     return sethasmore(false)
        // }else{
        //     return sethasmore(true)
        // }
      return  sethasmore(res.data.result.length > 0)
    }
   
}catch(err){
alert("task fetch failed")
}
}


const activetoken=getaccess()
useEffect(()=>{
    
    if(activetoken){
        getalltsk(activetoken,page)
    }
},[page,activetoken])




const handlenext=()=>{
    if(hasmore){
        setpage((prev)=>prev + 1)
    }
}


const handleprev=()=>{
    if(page > 1){
        setpage((prev)=>prev - 1)
    }
}


const taskpage=()=>{
    navigate("/addtask")
}


const complettask=async(i: string| number)=>{
    try{
    const res=await axios.patch(`http://localhost:3000/apis/status?taskid=${i}`,{},{headers:{Authorization:`Bearer ${token}`}})
    if(res.data.success){
         alert("task complected")
         return    window.location.reload()
    }
    }catch(err){
alert("status update failed")
    }
}

const deletetask=async(i:string)=>{
    try{
const res=await axios.post(`http://localhost:3000/apis/delete-task?taskid=${i}`,{},{headers:{Authorization:`Bearer ${token}`}})
if(res.data.success){
    alert("task deleted")
    return window.location.reload()
}
return alert(res.data.message)
}catch(err){
    alert("deletation failed")
}
}




  return (
    <div className='home-parent'>
<div className='home-container'>
<div className='home-header-row'>
    <h1 className='home-head'>Your tasks</h1>
</div>
<div className='filter-container'>
    <input type="text" className='loginfields' placeholder='Search with title' value={search} onChange={(e)=>setsearch(e.target.value)} />
    <button className="pagination-btn">Search</button>
    <label htmlFor="complet">Completed</label>
    <input type="radio"  value="Completed" name='taskstatus' id='complet' checked={checkedfilter==="Completed"} onChange={(e)=>{setpage(1),setcheckedfilter(e.target.value)}}  />
    <label htmlFor="pending">Pending</label>
    <input type="radio" value="Pending" name='taskstatus' id='pending' checked={checkedfilter === "Pending"} onChange={(e)=>{setpage(1),setcheckedfilter(e.target.value)}} />
</div>
  {/* {loading? <h1>Loading.....</h1> : token} */}
 <button onClick={taskpage} className='add-task-btn'>Add task + </button>

<div className='tasks-grid'>
    {tasks.length === 0 ?(
        <p className='no-tasks'>No task click Add task to add the task</p>
    ):(
        tasks.map((i,key)=>(

            <div key={key} className={`task-card ${i.status?.toLowerCase() === 'complected' || i.status?.toLowerCase() === 'completed' ? 'task-done' : ''}`} >
                <div className='task-content'>
            {i.title} <br />
            {i.description} <br />
            {i.status} <br />
            <button className='complete-action-btn'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdqcDl5ljZMQsptVeiZyxZF_KPmFCKXdmo7g&s" alt="" onClick={()=>complettask(i.id)}/></button>
            <button className='complete-action-btn' onClick={()=>deletetask(i.id)} >Dekete task</button>
            </div>
            </div>
            )))
        }

</div>
<div className='pagination-wrapper'>
<button onClick={handleprev} disabled={page === 1} className='pagination-btn'>Prev</button>
<button onClick={handlenext} disabled={!hasmore} className='pagination-btn'>Next</button>
</div>
</div>
    </div>
  )
}

export default Home
