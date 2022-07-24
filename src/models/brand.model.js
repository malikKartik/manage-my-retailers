const mongoose = require('mongoose');
const { BRAND_SCHEMA, RETAILER_SCHEMA } = require('../constants/schemas');

const brandSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, unique: true, trim: true, required: true },
  password: { type: String, required: true },
  retailers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: RETAILER_SCHEMA,
    },
  ],
});

module.exports = mongoose.model(BRAND_SCHEMA, brandSchema);
