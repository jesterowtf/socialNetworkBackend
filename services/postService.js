import Post from "../models/post-model.js";
import User from "../models/user-model.js";

class postService {
  async create(post, user) {
    // const fileName = fileService.saveImagePost(image)
    const createdPost = await new Post({
      text: post.text,
      tags: post.tags,
      image: post.image,
      likesCount: post.likesCount,
      viewsCount: post.viewsCount,
      user: user.id
    })
    createdPost.save()
    await User.findByIdAndUpdate(createdPost.user, {
      $push: {posts: createdPost._id}
    }, {new: true})
    return createdPost;
  }

  async getAll(req, res) {
    // const count = req.query.count || 5;
    // const page = req.query.page ? (+req.query.page * +req.query.count) : 0;
    // console.log(page)
    // let models = await User.find().skip(page).limit(count)
    let posts = await Post.find().populate('user').exec()
    return posts;
  }

  async getMyPosts(id) {
    // const count = req.query.count || 5;
    // const page = req.query.page ? (+req.query.page * +req.query.count) : 0;
    // console.log(page)
    // let models = await User.find().skip(page).limit(count)
    const targetUser = await User.findById(id);
    const findedPosts = [...targetUser.posts];
    const posts = await Post.find({
      '_id': {$in: findedPosts }
    }).populate('user').exec()

    return posts;
  }

  async getAllFriendsPosts(authUserId) {
    const authorizedUser = await User.findOne({"_id": authUserId})
    const friendsId =  [...authorizedUser.followed]
    const posts = await Post.find({
      user: {$in: friendsId }
    }).populate('user').exec()

    // let posts = await Post.find({}).populate('user').exec()
    return posts;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("id не указан")
    }
    const post = await Post.findByIdAndUpdate(
      {
        _id: id
      },
      {
        $inc: {viewsCount: 1}
      },
      {
        returnDocument: 'after'
      },
    )
    return post;
  }

  async likesUp(post, userId) {
    if (!post.id) {
      throw new Error("id не указан")
    }
    const updatedLikes = await Post.findByIdAndUpdate(
    {
      _id: post.id
    },
    {
      $push: {likedAccounts: userId},
      $inc: {likesCount: 1}
    },
    {new: true})
    return updatedLikes;
  }

  async likesDown(post, userId) {
    if (!post.id) {
      throw new Error("id не указан")
    }
    const updatedLikes = await Post.findByIdAndUpdate(
      {
        _id: post.id
      },
      {
        $pull: {likedAccounts: userId},
        $inc: {likesCount: -1}
      },
      {new: true})
    return updatedLikes;
  }

  async update(post) {
    console.log(`post update service`, post)
    if (!post._id) {
      throw new Error("id не указан")
    }
    const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true})
    return updatedPost;
  }

  async delete(id) {
    if (!id) {
      throw new Error("id не указан")
    }
    const deletedPost = await Post.findByIdAndDelete(id)
    return deletedPost;

  }


}

export default new postService()