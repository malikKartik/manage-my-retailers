const express = require('express');
const { isRetailer } = require('../middlewares/isRetailer');
const { retailerLogin } = require('../services/auth.service');
const { createRetailer, getRetailers } = require('../services/retailer.service');
const { startPromotion } = require('../services/retailerProduct.service');
const BasicRequestHandler = require('../utils/BasicRequestHandler');
const router = express.Router();
const requestHandler = new BasicRequestHandler(router);

requestHandler.get("/", (_) => {
  return getRetailers({});
})

requestHandler.post("/", (req) => {
  return createRetailer(req.body);
})

requestHandler.post("/login", (req) => {
  return retailerLogin(req.body.name, req.body.password)
})

requestHandler.post("/promote", (req) => {
  const {productId, price, endDate} = req.body;
  return startPromotion(productId, price, endDate);
}, {middlewares: [isRetailer]})

module.exports = router;
