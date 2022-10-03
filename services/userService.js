import fileService from "./fileService.js";
import User from "../models/user-model.js";

class UserService {
  async create(user, avatar) {
    const fileName = fileService.saveFile(avatar)
    const createdUser = await User.create({...user, avatar: fileName})
    return createdUser;
  }

  async getAll(req, res) {
    // const count = req.query.count || 5;
    // const page = req.query.page ? (+req.query.page * +req.query.count) : 0;
    // console.log(page)
    // let models = await User.find().skip(page).limit(count)
    let users = await User.find().populate('followed.user').populate('posts.post').exec()
    return users;
  }

  async getFriends(authUserId) {
    const authorizedUser = await User.findOne({"_id": authUserId})
    const friendsId =  [...authorizedUser.followed]
    const friends = await User.find({
      _id: {$in: friendsId }
    })
    console.log(friendsId)
    // let posts = await Post.find({}).populate('user').exec()
    return friends;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("id не указан")
    }
    const foundUser = await User.findById(id)
    return foundUser;
  }

  async follow(authUserId, user) {
    if (!authUserId) {
      throw new Error("id не указан")
    }
    const followedUser = await User.findByIdAndUpdate(authUserId.id, {
      $push: {followed: user}
    })
    return followedUser;
  }

  async unfollow(authUserId, user) {
    if (!authUserId) {
      throw new Error("id не указан")
    }
    const unfollowedUser = await User.findByIdAndUpdate(authUserId.id, {
      $pull: {followed: user}
    }, {new: true})
    return unfollowedUser;
  }

  async update(user) {

    if (!user._id) {
      throw new Error("id не указан")
    }
    const updatedUser = await User.findByIdAndUpdate(user._id, user, {new: true})
    return updatedUser;
  }

  async delete(id) {
    if (!id) {
      throw new Error("id не указан")
    }
    const deletedUser = await User.findByIdAndDelete(id)
    return deletedUser;

  }


}

export default new UserService()