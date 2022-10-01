import {Router} from "express";
import UserController from "../controllers/userController.js";
import uploadController from "../controllers/uploadController.js";

const uploadRouter = new Router()
uploadRouter.post('/', uploadController.upload)
export default uploadRouter;



