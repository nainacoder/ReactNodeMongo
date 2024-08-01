const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    productId: {
      type: String,
    },
    productName: {
      type: String,
      required: [true, 'Please add Product Name'],
    },
    supplierName: {
      type: String,
      required: [true, 'Please add Suplier Name'],
    },
    description: {
      type: String,
      required: [true, 'Please add product description'],
    },
    unit: {
      type: Number,
      required: [true, 'Please add Unit'],
    },
    price: {
      type: Number,
      required: [true, 'Please add Proce'],
    },
    isProductAvailable: {
      type: Boolean,
      required: [true, 'Please Mention'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
