const express = require('express');
const Task = require('../models/Task');
const { isApiLoggedIn } = require('../middleware/auth');

const router = express.Router();

router.use(isApiLoggedIn);

function taskData(body) {
  return {
    title: body.title,
    description: body.description,
    status: body.status,
    priority: body.priority,
    dueDate: body.dueDate || undefined,
  };
}

router.get('/', async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
});

router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json(task);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid task id' });
  }
});

router.post('/', async (req, res) => {
  try {
    const task = await Task.create({ ...taskData(req.body), createdBy: req.user._id });
    return res.status(201).json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      taskData(req.body),
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json({ message: 'Task deleted' });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid task id' });
  }
});

module.exports = router;
