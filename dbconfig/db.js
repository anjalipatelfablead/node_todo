const mongoose= require("mongoose");
const url = "mongodb://localhost:27017/testing"

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