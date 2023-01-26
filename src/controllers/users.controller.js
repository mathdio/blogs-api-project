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

module.exports = {
  validateLogin,
};