import {Router} from "express";
import authController from "../controllers/authController.js";
import {body} from "express-validator"

const authRouter = new Router();

authRouter.post('/registration', [
    body('email', "Email не может быть пустым").isEmail(),
    body('password', "Пароль меньше 4 или больше 10 символов").isLength({
      min: 4,
      max: 10
    })],
  authController.registration)
authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)
authRouter.get('/refresh', authController.refresh)
// authRouter.get('/models', authController.createRole)

export default authRouter;