const { User } = require('../models');

const validateLogin = async (email, password) => {
  const validUser = await User.findOne({
    where: { email, password },
  });
  if (!validUser) return { type: '400', message: 'Invalid fields' };

  return { type: null, message: '' };
};

module.exports = {
  validateLogin,
};