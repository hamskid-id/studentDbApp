const express = require('express');
const {Student} = require('../models/Student');
const router = express.Router();
//CREATE

router.post('/', async(req,res)=>{
    const{fullname, email, mobile, city, creator} = req.body;
    try{
        if(creator){
            const student = new Student({
                fullname,
                email,
                mobile, 
                city,
                creator
            });
            const savedStudent = await student.save()
            res.status(200).send(savedStudent);

        }
     }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }
})
router.get("/", async(req,res)=>{
    try{
        const students = await Student.find()
        res.status(200).send(students)

    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
})
router.delete("/:id",async(req,res)=>{
    try{
        const {_id} = req.body;
        const delete_student = await Student.deleteOne(_id);
        res.status(200).send(delete_student);
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router