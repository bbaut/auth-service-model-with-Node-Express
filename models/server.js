import express from "express";
import cors from "cors";
import router from "../routes/users.js";
import authRouter from "../routes/auth.js";
import dbConnection from "../db/config.js";
import corsOptions from "../helpers/cors.js";

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath = '/api/users';
        this.authPath = '/api/auth';

        //connect to db
        this.connectDB();

        //middlewares 
        this.middlewares();

        //routes
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }
        
    middlewares() {
        //CORS
        this.app.use(cors());

        //to backend
        this.app.use(express.json());

        //public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, authRouter);
        this.app.use(this.usersRoutePath, router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Rest server listening on ${this.port}`);
        })
    }
}

export default Server;