const router=require('express').Router();
// const mongoose=require('mongoose')
const RestaurantsModel = require('../models/Restaurants.model');
const dbConnect = require('../config/dbConfig');
dbConnect()
router.get('/',async(req,res)=>{
    try {
        const Restaurants=await RestaurantsModel.find({})
        if(Restaurants.length>0){
            res.status(200).json({
                success:true,
                message:" Available Restaurants",
                data:Restaurants
            })
        }
        else{
            res.status(201).json({
                success:false,
                message:"No Restaurants Available"
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal Error",
            error:error
        })
    }
})

router.post('/createRestaurant',async(req,res)=>{

    // console.log(req.body)
    // res.status(200).send(`Working RESTAURANTS ${req.body}`)
    try {
        const restaurant= await RestaurantsModel.findOne({
            $and:[
                {name:req.body.name},
                {"address.area":req.body.address.area}
            ]
        })
    if(!restaurant){
        const newRestaurant=await RestaurantsModel.create(req.body)
        console.log(newRestaurant);
        return res.status(200).json({
            success:"True",
            message:"Restaurant Created",
        })
    }
    else{
        return res.status(500).json({
            success:false,
            message:"Restaurant Already Exists",
        })
    }
    } catch (error) {
    return res.status(502).json({
        success:false,
        message:`Internal Error ${error}`,
    })
    }
})

module.exports=router