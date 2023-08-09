var express = require('express');
var router = express.Router();
const userModel=require('../models/Users.model')

const {hashPassword}=require('../config/auth')
/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users=await userModel.find({})
  if(users.length!==0){
    res.status(200).json({message:"Users",data:users});
  }
  res.status(400).json({message:"No Users Found",data:users});
});

router.post('/signUp',async(req,res)=>{
  const user=await userModel.findOne({name:req.body.name})
  try {
    // console.log(user);
    if(!user){
      const hashedPassword=await hashPassword(req.body.password)
      // req.body.password=await hashPassword(req.body.password)
      req.body.password=hashedPassword
      // console.log(req.body.password);
      const newUser=await userModel.create(req.body)
      // console.log(newUser)
      return res.status(200).json({message:"User Registered"})
    }
    else{
      return res.status(404).json({message:"User already exist"})
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({message:"Internal Error",error:error})

  }
})


module.exports = router;