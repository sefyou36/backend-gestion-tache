const Task = require('../models/taskModel');
const User = require('../models/userModel');


const createTask = (req,res) => {
    const text = req.body.text;
    const userID = req.user._id;
    const task = new Task({
        text,
        userId,
    })
    task.save()
    res.json({
        task : task
    })
};

const getAllTask = async (req,res) => {

    const tasks = await Task.find();

    res.json({

        data: {
            tasks
        }
    })

};

const getOneTask = async (req,res) => {
    const id = req.params.id ;
    const task = await Task.findById(id);
    if(!task) {
        return res.status(404).json({error : 'Task not found'});

    }
    res.json({
        task : task

    })
};

const updateTask = async (req,res) => {
    const id = req.params.id;
    const update = req.body;
    const updateTask = await Task.findByIdAndUpdate(id,update, {new:true});

    if(!updateTask) {

        return res.status(404).json({ error : 'Task not found'});

    }
    res.json({
        updateTask : updateTask
    })
};

const deleteTask = async (req,res) => {
    const id = req.params.id;
    const deleteTask = await Task.findByIdAndDelete(id);
    if (!deleteTask) {
        return res.status(404).json({ error : 'Task not found'});

    }
    res.json({
        deleteTask : deleteTask
    })

};

module.exports = {
    createTask,
    getAllTask,
    getOneTask,
    updateTask,
    deleteTask
}