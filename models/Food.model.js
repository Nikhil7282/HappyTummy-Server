const mongoose=require('mongoose')

const FoodSchema=mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    foodName:{
        type:String,
        required:true,
    },
    foodDescription:{
        type:String,
        required:true,
    },
    foodType:{
        type:String,
        required:true,
    },
    foodCategory:{
        type:String,
        required:false,
    },
    offerDetails: {
        offerPrice: {
          type: Number,
          required: false,
          default: null,
        },
        offerValue: {
          type: Number,
          required: false,
          default: null,
        },
        offerUnit: {
          type: String,
          required: false,
          default: null,
        },
        offerDescription: {
          type: String,
          required: false,
          default: null,
        },
      },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    updatedAt:{
        type:Date,
        default:Date.now(),
    }
})

const FoodModel=mongoose.model('foods',FoodSchema);
module.exports=FoodModel