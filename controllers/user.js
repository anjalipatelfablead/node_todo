const User = require("../models/usermodel");
const Task = require("../models/task");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createuser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(409).json({ message: "email is already there" });
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username, email, password: hashedpassword, role
        });
        res.status(201).json({ message: " user inserted: ", user })
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}

const getalluser = async (req, res) => {
    try {

        const users = await User.find();
        if (!users) {
            return res.status(404).json({ message: "user not found" });
        }

        res.status(200).json(users);

    } catch (err) {
        res.status(500).json({ message: err });
    }
}

const getuserbyid = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json("no user is there");
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

const deleteuser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json("no user is there");
        }
        await Task.deleteMany({ user: req.params.id });
        res.status(200).json({ message: "user deleted", user });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}

const updateuser = async (req, res) => {
    try {
        const updateduser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // new:true  it return new updated data in respponse

        if (!updateduser) {
            return res.status(404).json({ message: "user not found" });
        }

        res.status(200).json({ message: 'user updated', updateduser });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}

const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "email not registerd" });
        }

        const ismatch = await bcrypt.compare(password, user.password);

        if (!ismatch) {
            return res.status(401).json({ message: "invalid password" });
        }

        const token = jwt.sign({
            id: user._id,
            emial: user.email,
        },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "30m" }
        );

        res.status(200).json({
            message: 'logged in', token, user: {
                _id: user._id, username: user.username, email: user.email, role: user.role
            }
        })
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}

module.exports = { createuser, getalluser, getuserbyid, deleteuser, updateuser, loginuser };