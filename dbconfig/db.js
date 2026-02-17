const mongoose= require("mongoose");
const url =process.env.MONGODB_URI ;

const dbconnect= async() =>{
    try{
        await mongoose.connect(url);
        console.log("db connected");
    }catch(err)
    {
        console.log("error: ", err);
    }
}

module.exports= dbconnect;