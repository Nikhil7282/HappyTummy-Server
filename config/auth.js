const bcrypt=require('bcryptjs')
// const jwt=require('jsonwebtoken')
// const secretKey=process.env.secretKey


const hashPassword=async(password)=>{
    const salt=await bcrypt.genSalt(8)
    let hashedPassword=await bcrypt.hash(password,salt)
    // console.log(hashedPassword)
    return hashedPassword
}

module.exports={hashPassword}


