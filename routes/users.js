import { Router } from "express";
import { userGetMe, usersPost } from "../controllers/users.js";
import validateJWT from "../middlewares/validateJWT.js";

const router = Router();

router.get('/me', validateJWT, userGetMe);

router.post('/', usersPost);

export default router;