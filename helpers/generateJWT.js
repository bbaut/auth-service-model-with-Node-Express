import jwt from 'jsonwebtoken';

const generateJWT = (user_id) => {
    return new Promise((resolve, reject) => {
        const payload = {user_id};
        jwt.sign(payload, process.env.PRIVATEKEY, {
            expiresIn: '4h'
        }, (error, token) => {
            if(error) {
                console.log(error);
                reject("Web token not generated");
            }
            else {
                resolve(token);
            }
        })
    })
}

export default generateJWT