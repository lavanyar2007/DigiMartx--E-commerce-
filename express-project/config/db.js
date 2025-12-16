const mongoose=require("mongoose")

async function connectDb(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb connected successfully");
    }
    catch(err){
        console.log("MongoDb connection error",err.message);
        process.exit(1);
    }
}
module.exports=connectDb;