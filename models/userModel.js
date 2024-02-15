const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
   lastName : {
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
    timestamp: {
        type: String,
        default: Date.now()
    }
});

const User = mongoose.model("User", TodoSchema);

module.exports = User;