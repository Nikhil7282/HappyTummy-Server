const mongoose=require('mongoose')

const dbConnect=async()=>{
    try{
        await mongoose.connect(process.env.dbUrl)
        console.log("Db Connected");
    }
    catch(error){
        console.log(`Mongoose Error ${error}`)
    }
}

module.exports=dbConnect