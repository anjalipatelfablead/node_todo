const mongoose = require("mongoose");

const task = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: [ "pending", "in progress", "completed"],
        required: true,
        default:"pending"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",   // match model name 
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Task", task);
