const Task = require("../models/task");

const addtask = async (req, res) => {
    try {

        const { title, description, status, user } = req.body;

        // const taskstatus = "pending"
        // const task = await Task.create({ title, description, status: status ? status : taskstatus, user });
        const task = await Task.create({ title, description, status, user });

        res.status(200).json({ message: "task inserted", task });
    }
    catch (err) {
        res.status(500).json({ mesage: err });
    }
}

const getalltask = async (req, res) => {
    try {
        // const tasks= await Task.find();
        // const tasks= await Task.find().populate("user");
        const tasks = await Task.find().populate("user", "username email");
        if (!tasks) {
            return res.status(404).json({ message: "no task is there" });
        }

        res.status(200).json(tasks);
    }
    catch (err) {
        res.status(500).json({ mesage: err });
    }
}

const gettaskbyid = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "no task is there" });
        }

        res.status(200).json(task);
    }
    catch (err) {
        res.status(500).json({ mesage: err });
    }
}


const gettaskbyuser = async (req, res) => {
    try {

        const userid = req.params.id;
        const task = await Task.find({ user: userid });
        if (!task) {
            return res.status(404).json({ message: "no task is there" });
        }

        res.status(200).json(task);
    }
    catch (err) {
        res.status(500).json({ mesage: err });
    }
}

const deletetask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "no task is there" });
        }

        res.status(200).json({ message: "task is deelted", task });
    }
    catch (err) {
        res.status(500).json({ mesage: err });
    }
}

const updatetask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });  // new:true  it return new updated data in respponse
        if (!task) {
            return res.status(404).json({ message: "no task is there" });
        }

        res.status(200).json({ message: "task is deleted", task });
    }
    catch (err) {
        res.status(500).json({ mesage: err });
    }
}

module.exports = { addtask, getalltask, gettaskbyid, deletetask, updatetask, gettaskbyuser };