import userService from '../services/userService.js';

class UserController {
  async create(req, res) {
    try {
      console.log(req.files);
      const user = await userService.create(req.body, req.files.avatar)
      res.status(200).json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getAll(req, res) {
    try {
      const users = await userService.getAll(req, res)
      return res.json(users)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getOne(req, res) {
    try {
      const foundUser = await userService.getOne(req.params.id)
      return res.json(foundUser)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async follow(req, res) {
    try {
      console.log(`req.user`, req.user)
      console.log(`req.body`, req.body)
      const followUser = await userService.follow(req.user,req.body.user)
      return res.json(followUser);
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async unfollow(req, res) {
    try {
      console.log(`req.user`, req.user)
      console.log(`req.body`, req.body)
      const followUser = await userService.unfollow(req.user,req.body.user)
      return res.json(followUser);
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async update(req, res) {
    try {
      const updatedUser = await userService.update(req.body)
      return res.json(updatedUser);
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async delete(req, res) {
    try {
      const deletedUser = await userService.delete(req.params.id)
      return res.json(deletedUser)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

}


export default new UserController()