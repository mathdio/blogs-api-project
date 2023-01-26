const jwt = require('jsonwebtoken');
const usersService = require('../services/users.service');

const { JWT_SECRET } = process.env;

const validateLogin = async (req, res) => {
  const { email, password } = req.body;

  const { type, message } = await usersService.validateLogin(email, password);
  if (type) return res.status(type).json({ message });

  const payload = {
    email: req.body.email,
  };

  const token = jwt.sign(payload, JWT_SECRET);
  return res.status(200).json({ token });
};

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { type, message } = await usersService.createUser(displayName, email, password, image);
  if (type) return res.status(type).json({ message });

  const payload = {
    displayName,
    email,
    image,
  };

  const token = jwt.sign(payload, JWT_SECRET);
  return res.status(201).json({ token });
};

const findAll = async (req, res) => {
  const { type, message } = await usersService.findAll();
  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  validateLogin,
  createUser,
  findAll,
};