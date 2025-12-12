const mongoose=require("mongoose")

async function connectDb(){
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/digimartx");
        console.log("MongoDb connected successfully");
    }
    catch(err){
        console.log("MongoDb connection error",err.message);
        process.exit(1);
    }
}
module.exports=connectDb;