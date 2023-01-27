const { User } = require('../models');

const validateLogin = async (email, password) => {
  const validUser = await User.findOne({
    where: { email, password },
  });
  if (!validUser) return { type: 400, message: 'Invalid fields' };

  return { type: null, message: validUser };
};

const createUser = async (displayName, email, password, image) => {
  const freeEmail = await User.findOne({ where: { email } });
  if (freeEmail) return { type: 409, message: 'User already registered' };

  const newUser = await User.create({ displayName, email, password, image });
  if (newUser) return { type: null, message: '' };
};

const findAll = async () => {
  const result = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return { type: null, message: result };
};

const findById = async (id) => {
  const result = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  if (!result) return { type: 404, message: 'User does not exist' };

  return { type: null, message: result };
};

module.exports = {
  validateLogin,
  createUser,
  findAll,
  findById,
};