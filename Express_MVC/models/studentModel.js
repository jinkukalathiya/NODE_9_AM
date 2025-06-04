const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const Student = mongoose.model('student', studentSchema);

module.exports = Student;