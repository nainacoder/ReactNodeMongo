const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add FullName'],
    },
    email: {
      type: String,
      required: [true, 'Please add email'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('User', userSchema);

// const UserSchema = mongoose.model(
//   'User',
//   new mongoose.Schema({
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//   })
// );

// exports.User = UserSchema;
