import {Router} from "express";
import {userController} from "../controllers/index.js";
import {authMiddleware} from "../middlewares/index.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";
import * as userValidation from "../validation/userValidation.js";

const userRouter = new Router()

userRouter.post('/register', userValidation.register, handleValidationErrors, userController.register)
userRouter.post('/login', userValidation.login, handleValidationErrors, userController.login)
userRouter.get('/auth', authMiddleware.checkAuth, userController.check)

export default userRouter