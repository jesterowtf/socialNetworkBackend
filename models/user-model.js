import mongoose from "mongoose";

const User = new mongoose.Schema({
  // _id: {type: String},
  firstName: {type: String},
  secondName: {type: String},
  email: {type: String, unique: true, required: true},
  password: {type: String},
  age: {type: String},
  avatar: {type: String},
  status: {type: String},
  about: {type: String},
  location: {
    city: String,
    country: String,
  },
  contacts: {
    phone: String,
  },
  roles: [{type: String, ref: 'Role'}],
  messages: [
    {message: String}
  ],
  posts:  {type: Array},
  followed: {type: Array}
  // posts: [
  //   {
  //     post: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'Post'
  //     }
  //   }
  // ],

  // followed: [
  //   {
  //     user: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'User'
  //     }
  //   }
  // ]



})


export default mongoose.model('User', User)