const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    text : {
        type: String,
        required :true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    complete : {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: String,
        default: Date.now()
    }
});

const Task= mongoose.model("Task", TodoSchema);

module.exports = Task;