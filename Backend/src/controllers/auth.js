const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const createToken = (user) =>
  jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

const toPublicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email
});

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    const existingUser = await User.findOne({ email: email?.toLowerCase().trim() });

    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: passwordHash });

    res.status(201).json({ token: createToken(user), user: toPublicUser(user) });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email: email?.toLowerCase().trim() });
    const passwordMatches = user && (await bcrypt.compare(password || '', user.password));

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Email or password is incorrect' });
    }

    res.json({ token: createToken(user), user: toPublicUser(user) });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User account no longer exists' });
    }

    res.json({ user: toPublicUser(user) });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin, getCurrentUser };
