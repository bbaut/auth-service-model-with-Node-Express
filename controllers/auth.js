import {response} from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.js"
import generateJWT from "../helpers/generateJWT.js";


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //Check if the email is on the db
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: 'User or password incorrect - email'
            })
        }

        //Check the password
        const validatePassword = bcryptjs.compareSync(password, user.password);
        if (!validatePassword) {
            return res.status(400).json({
                msg: 'User or password incorrect - password'
            })
        }

        //Generate the JWT
        const token = await generateJWT(user.id)

        res.json({
            user,
            token
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Something went wrong"
        })
    }
}

export default login