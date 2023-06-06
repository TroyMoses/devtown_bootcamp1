const express = require("express");
const router = express.Router();
const  User = require("../models/user.models")

const register = async(req, res) => {
try {
    const {username, email, password} = req.body;

    const user = new User({
        username, email, password
    })

    await user.save();

    return res.status(201).send(user);
} catch (error) {
    return res.status(400).send({error:error.message});

}
    
}

const login = async(req, res) => {
    try {
        let user = await User.find({email:req.body.email});

        if (!user) {
            res.send("User is not registered!")
        }

        if(user.password == req.body.password) {
            return res.status(200).send(user); 
        }

    } catch (error) {
        return res.status(400).send({error:error.message});
    }
}

module.exports = {register, login}