const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const secretKey=process.env.secretKey


const hashPassword=async(password)=>{
    const salt=await bcrypt.genSalt(8)
    let hashedPassword=await bcrypt.hash(password,salt)
    // console.log(hashedPassword)
    return hashedPassword
}

const compare=async(password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword)
}

const createToken=async(payload)=>{
    const token=await jwt.sign(payload,secretKey,{expiresIn:'24h'})
    return token;
}

const validate=async(req,res,next)=>{
    if(req.headers.authorization){
        const token=req.headers.authorization.split(" ")[1]
        const data=await jwt.decode(token)
        if(Math.floor((+new Date())/1000)<data.exp){
            next()
        }
        else{
            return res.status(402).json({message:"Token Expired"})
        }
    }
    else{
        return res.status(404).json({message:"Token Not Found"})

    }   
}

const adminCheck=async(req,res,next)=>{
    if(req.headers.authorization){
        const token=req.headers.authorization.split(" ")[1]
        const data=await jwt.decode(token)
        // console.log(data.adminRole);
        if(data.adminRole){
            next()
        }
        else{
            return res.status(400).json({message:"Access Denied"})
        }
    }
    else{
        return res.status(404).json({message:"Token Not Found"})

    }
}
module.exports={hashPassword,compare,createToken,validate,adminCheck}


