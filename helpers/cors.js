import dotenv from 'dotenv';
dotenv.config();

const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if(whiteList.includes(origin)) {
            callback(null, true);
        } 
        else {
            callback(new Error("Cors error"));
        }
    }
}

export default corsOptions;