const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
    },
    restaurantName:{
        type:String,
        required:false,
    },
    contactNumber:{
        type:String,
        required:false,
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

const UsersModel=mongoose.model('users',UserSchema);
module.exports=UsersModel