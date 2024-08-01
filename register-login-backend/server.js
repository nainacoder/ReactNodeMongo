const mongoose = require('mongoose');
const userRegister = require('./routes/usersRegister');
const userLogin = require('./routes/userLogin');
const addProducts = require('./routes/addProduct');
const getProducts = require('./routes/getProduct');
const deleteProducts = require('./routes/deleteProduct');

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();

mongoose
  .connect('mongodb://localhost:27017/Users')
  .then(() => console.log('Now connected to MongoDB!'))
  .catch((err) => console.error('Something went wrong', err));

app.use(express.json());
app.use(cors());
app.use('/api/users', userRegister);
app.use('/login', userLogin);
app.use('/add-products', addProducts);
app.use('/get-products', getProducts);
app.use('/delete-products', deleteProducts);
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
