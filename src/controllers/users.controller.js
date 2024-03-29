const jwt = require('jsonwebtoken');
const usersService = require('../services/users.service');

const { JWT_SECRET } = process.env;

const validateLogin = async (req, res) => {
  const { email, password } = req.body;

  const { type, message } = await usersService.validateLogin(email, password);
  if (type) return res.status(type).json({ message });

  const payload = {
    email: req.body.email,
    id: message.id,
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

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await usersService.findById(id);
  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  const { type, message } = await usersService.deleteUser(id);
  if (type) return res.status(type).json({ message });

  return res.status(204).end();
};

module.exports = {
  validateLogin,
  createUser,
  findAll,
  findById,
  deleteUser,
};