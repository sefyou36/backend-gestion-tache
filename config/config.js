const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/TaskManagement', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(()=> console.log("Connected to MongoDB")).catch(console.error)

module.exports = mongoose; 