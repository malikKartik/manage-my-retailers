const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../constants/env');
const { get: getBrand } = require('../daos/brand.dao');
const { get: getRetailer } = require('../daos/retailer.dao');

const hashPassword = (exports.hashPassword = (password) => {
  return bcrypt.hash(password, 8);
});

const verfiyPassword = (exports.verfiyPassword = (password, hash) => {
  return bcrypt.compare(password, hash);
});

const generateToken = (exports.generateToken = (id, isRetailer) => {
  return jwt.sign({ id, isRetailer }, jwtSecret);
});

const verifyToken = (exports.verifyToken = (req, res) => {
  const token =
    req?.body?.token ||
    req?.query?.token ||
    req?.headers?.['x-access-token'] ||
    req?.headers?.authorization?.replace('Bearer ', '');
    if (!token) {
      return false;
    }
    try {
      return jwt.verify(token, jwtSecret);
    } catch (error) {
      return false;
    }
});

const login = (exports.login = async (name, password, isRetailer, get) => {
  const entity = (await get({ name }))?.[0];
  if (!entity) {
    return {
      token: null,
      message: 'Authentication failed',
    };
  }
  const isVerified = await verfiyPassword(password, entity.password);
  if (isVerified) {
    return { token: generateToken(entity._id, isRetailer) };
  } else {
    return {
      token: null,
      message: 'Authentication failed',
    };
  }
});
const brandLogin = (exports.brandLogin = async (name, password) => {
  return login(name, password, false, getBrand);
});
const retailerLogin = (exports.retailerLogin = async (name, password) => {
  return login(name, password, true, getRetailer);
});
