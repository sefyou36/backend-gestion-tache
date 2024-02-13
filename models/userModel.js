const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
   name : {
        type: String,
        required :true
    },
    firstName : {
        type : String,
        required :true

    },
    password: {
        type : String,
        required : true
    },
    email : {
        type : String,
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

const User = mongoose.model("Todo", TodoSchema);

module.exports = User;