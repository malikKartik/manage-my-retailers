const express = require('express');
const { brandLogin } = require('../services/auth.service');
const { getBrands, saveBrand } = require('../services/brand.service');
const BasicRequestHandler = require('../utils/BasicRequestHandler');
const router = express.Router();

const requestHandler = new BasicRequestHandler(router);

requestHandler.get("/", (_) => {
  return getBrands({});
})

requestHandler.post("/", (req) => {
  return saveBrand(req.body);
})

requestHandler.post("/login", (req) => {
  return brandLogin(req.body.name, req.body.password)
})

module.exports = router;
