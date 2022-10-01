import mongoose from "mongoose";

const Post = new mongoose.Schema(
  {
    title: {type: String, required: true},
    text: {type: String, required: true},
    image: {type: String},
    tags: {type: Array, default: []},
    likesCount: {type: Number, default: 0},
    viewsCount: {type: Number, default: 0},
    likedAccounts: {type: Array},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  },
  {timestamps: true}
)


export default mongoose.model('Post', Post)