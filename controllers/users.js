// import { request, response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.js";

const userGetMe = async (req,res) => {

    // const {id} = req.params
    // const user = await User.findById(id);

    const userAuthenticated = req.user;

    res.json(userAuthenticated);
}

const usersPost = async (req,res) => {
    const {username, email, password} = req.body;

    const oldUser = await User.findOne({email})
    if (oldUser) {
        return res.status(400).json({
            msg: "This email is already registered."
        })
    }

    //encrypt the password
    const encryptedPassword = bcryptjs.hashSync(password, 10);
    
    //create new user
    const user = new User({
        username: username, 
        email: email.toLowerCase(), 
        password: encryptedPassword
    }); 
    
    await user.save();
    res.json({
        user
    });
}

export {
    userGetMe,
    usersPost,
}