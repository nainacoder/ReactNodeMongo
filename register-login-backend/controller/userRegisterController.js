const User = require('../models/UserModal');
// const bcrypt = require('bcrypt.js');
// app.use(bcrypt);
const Register = async (req, res) => {
  console.log('users*******', User);
  // res.send('user created successfully');
  // Check if this user already exisits
  let user = await User.findOne({ email: req.body.email });
  // bcrypt.genSalt(10, (err, salt) => {
  //   if (!err) {
  //     bcrypt.hash(User.password, salt, (err, hpass) => {
  //       if (!err) {
  //         console.log(hpass);
  //       }
  //     });
  //   }
  // });
  // console.log(user);
  if (user) {
    return res.status(400).send('That user already exisits!');
  } else {
    // Insert the new user if they do not exist yet
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.send('Registration Successfull');
  }
};

module.exports = Register;
