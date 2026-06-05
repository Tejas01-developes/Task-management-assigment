import { createContext, useRef } from "react";


export const Authcontext=createContext(null)

export const Authprovider=({children})=>{
const tokenref=useRef(null)


const setaccess=(token)=>{
    tokenref.current=token
}

const getaccess=()=>{
return tokenref.current
}


const clearaccess=()=>{
    return tokenref.current=""
    }

return(
    <Authcontext.Provider value={{setaccess,getaccess,clearaccess}}>{children}</Authcontext.Provider>
    
    )

}


