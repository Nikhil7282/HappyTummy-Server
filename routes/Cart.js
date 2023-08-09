const router=require('express').Router();
const CartModel = require('../models/Cart.model');

router.get('/',async(req,res)=>{
    const carts=await CartModel.find({})
    res.json(carts)
})

router.post('/createCart',async(req,res)=>{
    if(!req.body.userId || !req.body.restaurantId){
        return res.status(401).json({
            success:"False",
            message:"User or Restaurant Details not found"
        })
    }
    let total=0
    if(req.body.foodItems.length !==0){
        req.body.foodItems.forEach(food=> {
            total+=food.price*food.quantity
        });
        req.body.cartTotal=total
    }
    else{
        return res.status(401).json({
            success:false,
            message:"Food Items is empty"
        })
    }
    // console.log(req.body.cartTotal)
    const cart=await CartModel.create(req.body)
    try {
        if(cart && cart._id){
            return res.status(200).json({
                success:true,
                message:"Cart Added"
            })
        }
        else{
            return res.status(500).json({
                success:false,
                message:"Cart Not Added"
            }) 
        }
    } catch (error) {
        return res.status(501).json({
            success:false,
            message:`Internal Error ${error}`
        })   
    }
})

router.patch("/updateCart", async function (req, res) {
    const { cartId, restaurantId, foodItems, couponApplied } = req.body;
    let total = 0;
  
    if (!restaurantId) {
      return res.status(401).json({
        success: false,
        message: "Some data is missingy",
        error: "User Details is missing in request",
      });
    }
    if (foodItems.length > 0) {
      foodItems.forEach((food) => {
        total += food.price * food.quantity;
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Food Items is empty",
        error: "Food Items array is empty",
      });
    }
    CartModel.findByIdAndUpdate(
      { _id: cartId },
      {
        $set: {
          foodItems,
          restaurantId,
          cartTotal: total,
          couponApplied,
          updateOn: Date.now(),
        },
      }
    )
      .then((response) => {
        if (response && response._id) {
          return res.status(200).json({
            success: true,
            message: "Cart updated successfully!!!",
            data: response,
          });
        }
      })
      .catch((error) => {
        return res.status(401).json({
          success: false,
          message: "Error updating cart",
          error: error,
        });
      });
  });
  

module.exports=router