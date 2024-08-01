const User = require('../models/UserModal');

const Login = async (req, res) => {
  //   console.log('login*******', req.body.email);
  //   res.send({ message: 'login successfully' });
  await User.findOne({ email: req.body.email }).then((user) => {
    console.log('loggedINuser****', user);
    if (user !== null) {
      if (user.password === req.body.password) {
        return res.status(200).send('LoggedIn Successfully');
      } else {
        res.status(400).send('Incorrect Password');
      }
    } else {
      res.status(400).send('User doesnot exists, please register to login');
    }
  });
};

module.exports = Login;
