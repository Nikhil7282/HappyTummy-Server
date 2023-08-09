const router=require('express').Router();
const FoodModel = require('../models/Food.model');

router.get('/:restaruantId',async(req,res)=>{
    const id=req.params.restaruantId
    const foods= await FoodModel.find({restaurantId:id})
    // console.log(foods)
    try {
        if(foods.length===0){
            return res.status(200).json({
                message:"No Food Available"
            })
        }
        else{
            return res.status(200).json({
                message:"Food Available",
                response:foods
            }) 
        }
    } catch (error) {
        return res.status(500).json({
            message:`Internal Error ${error}`,
        }) 
    }
    res.send("Food Working")
})

router.post('/createFood',async(req,res)=>{
    const food=await FoodModel.findOne({
        $and:[
            {restaurantId:req.body.restaurantId},
            {foodName:req.body.foodName}
        ]
    })
    try {
        if(!food){
            const newFood=await FoodModel.create(req.body)
            return res.status(200).json({
                success:true,
                message:"Food Added"
            })
        }
        else{
            return res.status(500).json({
                success:false,
                message:"Food Already Exists"
            }) 
        }
    } catch (error) {
        return res.status(502).json({
            success:false,
            message:`Internal Error ${error}`
        }) 
    }
})


module.exports=router