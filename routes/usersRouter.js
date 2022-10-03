import {Router} from "express";
import UserController from "../controllers/userController.js";

const usersRouter = new Router()
usersRouter.get('/users', UserController.getAll)
usersRouter.get('/friends', UserController.getFriends)
usersRouter.get('/profile/:id', UserController.getOne)
usersRouter.post('/users', UserController.create)
usersRouter.post('/follow', UserController.follow)
usersRouter.post('/unfollow', UserController.unfollow)
usersRouter.put('/users', UserController.update)
usersRouter.delete('/users/:id', UserController.delete)
export default usersRouter;



