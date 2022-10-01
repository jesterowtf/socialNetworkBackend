import postService from "../services/postService.js";

class PostController {
  async create(req, res) {
    try {
      const newPost = await postService.create(req.body.post, req.user)
      return res.json(newPost)
    } catch (e) {
      console.log(e)
      res.json(e)
    }
  }


  async getAll(req, res) {
    try {
      const posts = await postService.getAll(req, res)
      return res.json(posts)
    } catch (e) {
      console.log(e)
      throw new Error("Не удалось получить посты")
    }
  }

  async getMyPosts(req, res) {
    try {
      const myPosts = await postService.getMyPosts(req.params.id)
      return res.json(myPosts)
    } catch (e) {
      console.log(e)
      throw new Error("Не удалось получить посты")
    }
  }

  async getAllFriendsPosts(req, res) {
    try {
      const posts = await postService.getAllFriendsPosts(req.user.id)
      return res.json(posts)
    } catch (e) {
      console.log(e)
      throw new Error("Не удалось получить посты друзей")
    }
  } 

  async getOne(req, res) {
    try {
      const post = await postService.getOne(req.params.id)
      return res.json(post)
    } catch (e) {
      console.log(e)
      throw new Error("Не удалось получить пост")
    }
  }

  async update(req, res) {
    try {
      const updatedPost = await postService.update(req.body.post)
      return res.json(updatedPost)
    } catch (e) {
      console.log(e)
      throw new Error("Не удалось обновить пост")
    }
  }

  async likesUp(req, res) {
    try {
      const updatedLikes = await postService.likesUp(req.body, req.user.id)
      return res.json(updatedLikes)
    } catch (e) {
      console.log(e)
      throw new Error("Не удалось обновить пост")
    }
  }

  async likesDown(req, res) {
    try {
      const updatedLikes = await postService.likesDown(req.body, req.user.id)
      return res.json(updatedLikes)
    } catch (e) {
      console.log(e)
      throw new Error("Не удалось обновить пост")
    }
  }

  async delete(req, res) {
    try {
      const deletedPost = await postService.delete(req.params.id)
      return res.json(deletedPost)
    } catch (e) {
      console.log(e)
      throw new Error("Не удалось удалить пост")
    }
  }
}

export default new PostController();