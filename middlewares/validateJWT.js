import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'

const validateJWT = async (req = request, res = response, next) => {
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    )
    {
        try {
            token = req.headers.authorization.split(' ')[1];

            const {user_id} = jwt.verify(token, process.env.PRIVATEKEY);
            const user = await User.findById(user_id);

            req.user = user;

            next();



            // const decoded = jwt.verify(token, process.env.PRIVATEKEY);
            
            // req.user = await User.findById(decoded.id).select("-password -__v");

            // return next()
        } catch (error) {
            return res.status(404).json({
                    msg: 'Token error'
            })
        }

        if(!token){
            return res.status(401).json({
                msg: "There is no token"
            })
        }

        next();
    }
    // const token = req.header('xtoken');
    // if(!token){
    //     return res.status(401).json({
    //         msg: "There is no token"
    //     })
    // }

    // try {
    //     const {user_id} = jwt.verify(token, process.env.PRIVATEKEY);
    //     const user = await User.findById(user_id);

    //     if(!user) {
    //         return res.status(401).json({
    //             msg: 'No valid token - user is not on the db'
    //         })
    //     }

    //     req.user = user;

    //     next();
    // }
    // catch(error){
    //     console.log(error);
    //     res.status(401).json({
    //         msg: 'No valid token'
    //     })
    // }
}

export default validateJWT;