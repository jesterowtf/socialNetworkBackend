import {Router} from "express";
import PostController from "../controllers/postController.js";

const postsRouter = new Router()

postsRouter.get('/posts', PostController.getAll)
postsRouter.get('/myposts/:id', PostController.getMyPosts)
postsRouter.get('/postsFriends', PostController.getAllFriendsPosts)

postsRouter.get('/posts/:id', PostController.getOne)
postsRouter.post('/posts', PostController.create)
postsRouter.put('/posts', PostController.update)
postsRouter.put('/likesup', PostController.likesUp)
postsRouter.put('/likesdown', PostController.likesDown)
postsRouter.delete('/posts/:id', PostController.delete)

export default postsRouter;
