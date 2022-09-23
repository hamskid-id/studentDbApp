const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    fullname:{type: String, required: true},
    email:{type: String, required: true},
    mobile:{type: Number, required: true},
    city:{type: String, required: true},
    creator:{type: String, required: true}
},{
    timestamps:true
})
const Student = mongoose.model("Student", studentSchema)
exports.Student = Student;