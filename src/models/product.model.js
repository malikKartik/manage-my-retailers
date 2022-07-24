const mongoose = require('mongoose');
const { PRODUCT_SCHEMA, RETAILER_SCHEMA, BRAND_SCHEMA } = require('../constants/schemas');

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type: String, required: true, trim: true, unique: true},
  price: {type: Number, required: true},
  retailers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: RETAILER_SCHEMA,
  }],
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: BRAND_SCHEMA,
    required: true,
  },
});

module.exports = mongoose.model(PRODUCT_SCHEMA, productSchema);
