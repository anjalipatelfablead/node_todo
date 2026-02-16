const express = require('express');
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");

const db = require("./dbconfig/db");
const userroute = require("./routes/user");
const taskroute = require("./routes/task");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db();

const upload = multer();
app.use(upload.none()); // for text-only multipart form-data

app.use("/user", userroute);
app.use("/task", taskroute);

app.listen(process.env.PORT, () => {
    console.log("listening on port 3000");
});