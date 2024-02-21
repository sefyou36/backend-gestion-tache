const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    text : {
        type: String,
        required :true
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
TodoSchema.virtual('id').get(function() {
    return this._id.toHexString();
  });

const Task= mongoose.model("Task", TodoSchema);

module.exports = Task;