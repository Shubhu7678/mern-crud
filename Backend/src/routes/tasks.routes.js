const express = require('express');
const {
  createTask,
  getAllTasks,
  toggleTask,
  deleteTask
} = require('../controllers/tasks');
const requireAuth = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth);

router.post('/', createTask);
router.get('/', getAllTasks);
router.patch('/:id/toggle', toggleTask);
router.delete('/:id', deleteTask);

module.exports = router;