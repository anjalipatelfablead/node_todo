const mongoose = require("mongoose");

const user = new mongoose.Schema({

    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        enum: ["user", "admin"],
        require: true,
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", user);
