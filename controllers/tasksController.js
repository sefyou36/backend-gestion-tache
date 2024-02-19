
const Task = require('../models/taskModel');
const User = require('../models/userModel');

const createTask = async (req, res) => {
    const text = req.body.text;
    const userId = req.user._id; 

    try {
        const task = new Task({
            text,
            userId
        });
        await task.save();
        res.json({ task });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json({ data: { tasks } });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getOneTask = async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ task });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateTask = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        const updateTask = await Task.findByIdAndUpdate(id, update, { new: true });
        if (!updateTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ updateTask });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteTask = await Task.findByIdAndDelete(id);
        if (!deleteTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ deleteTask });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createTask,
    getAllTask,
    getOneTask,
    updateTask,
    deleteTask
};

