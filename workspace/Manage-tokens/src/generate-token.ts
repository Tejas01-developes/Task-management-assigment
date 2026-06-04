import jwt from 'jsonwebtoken';

export const accesstoken=(id:string)=>{
return jwt.sign(
    {id:id},
    process.env.ACCESS_KEY as string,
    {expiresIn:"15m"}
)
}

export const refreshtoken=(id:string)=>{
    return jwt.sign(
        {id:id},
        process.env.REFRESH_KEY as string,
        {expiresIn:"7d"}
    )
    }