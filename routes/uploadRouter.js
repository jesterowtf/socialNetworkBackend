import {Router} from "express";
import uploadController from "../controllers/uploadController.js";

const uploadRouter = new Router()
uploadRouter.post('/', uploadController.upload)
export default uploadRouter;



