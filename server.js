const express = require('express');
require("dotenv").config();
const db= require("./dbconfig/db");
const userroute= require("./routes/user");
const taskroute= require("./routes/task");

const app= express();

app.use(express.json());

db();

app.use("/user",userroute);
app.use("/task",taskroute);

app.listen(process.env.PORT,()=>{
    console.log("listening on port 3000");
});