const express = require('express');
const { signup, signin, getCurrentUser } = require('../controllers/auth');
const requireAuth = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me', requireAuth, getCurrentUser);

module.exports = router;
