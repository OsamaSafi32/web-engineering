const express = require('express');
const Task = require('../models/Task');
const { isLoggedIn } = require('../middleware/auth');

const router = express.Router();

router.use(isLoggedIn);

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
  res.render('tasks/index', { tasks });
});

router.get('/new', (req, res) => {
  res.render('tasks/new', { error: null });
});

router.post('/', async (req, res) => {
  try {
    await Task.create({ ...taskData(req.body), createdBy: req.user._id });
    res.redirect('/tasks');
  } catch (error) {
    res.status(400).render('tasks/new', { error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id });

    if (!task) {
      return res.status(404).render('tasks/not-found');
    }

    return res.render('tasks/show', { task });
  } catch (error) {
    return res.status(404).render('tasks/not-found');
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id });

    if (!task) {
      return res.status(404).render('tasks/not-found');
    }

    return res.render('tasks/edit', { task, error: null });
  } catch (error) {
    return res.status(404).render('tasks/not-found');
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
      return res.status(404).render('tasks/not-found');
    }

    return res.redirect(`/tasks/${task._id}`);
  } catch (error) {
    let task = null;

    try {
      task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id });
    } catch (findError) {
      return res.status(404).render('tasks/not-found');
    }

    if (!task) {
      return res.status(404).render('tasks/not-found');
    }

    return res.status(400).render('tasks/edit', { task, error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
  res.redirect('/tasks');
});

module.exports = router;
