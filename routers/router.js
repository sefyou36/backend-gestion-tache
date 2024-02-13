const express = require('express');
const { createTask, getAllTask, getOneTask, updateTask, deleteTask } = require('../controllers/tasksController');

const router = express.Router();

router.post('/v1/taskController', createTask);
router.get('/v1/taskController',getAllTask);
router.get('/v1/taskController/:id',getOneTask);
router.put('/v1/taskController/:id',updateTask);
router.delete('/v1/taskController/:id',deleteTask);


module.exports = router