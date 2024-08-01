const Product = require('../models/ProductModal');
// const { v4: uuidv4 } = require('uuid');

const AddProducts = async (req, res) => {
  // res.send({ message: 'products added' });
  const products = new Product({
    // productId: uuidv4(),
    productName: req.body.productName,
    supplierName: req.body.supplierName,
    description: req.body.description,
    unit: req.body.unit,
    price: req.body.price,
    isProductAvailable: req.body.isProductAvailable,
  });
  await products.save();
  res.send('Product Added');
};

const GetProducts = async (req, res) => {
  // const db = mongoose.db('Users');
  // const collection=mongoose
  //console.log('productsList*********', Product.find());
  const data = await Product.find();
  res.status(200).json({
    success: true,
    data,
  });
};

const DeleteProducts = async (req, res) => {
  console.log('Req.body***', req.body);
  console.log('ReqParams***', req.params);
  await Product.deleteOne({ _id: req.params.id });
  res.status(200).send({ message: 'deleted successfully' });
};

module.exports = { AddProducts, GetProducts, DeleteProducts };
