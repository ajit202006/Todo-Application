import express from "express";
import userController from "../controllers/users";
import { validateRegistration, validateLogin } from "../middlewares/userValidator";
const userRouter = express.Router();

userRouter.post('/register', validateRegistration, userController.register);
userRouter.post('/login', validateLogin, userController.login);

export default userRouter;