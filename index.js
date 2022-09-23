const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const studentsRoute = require('./routes/createstudents');
const app = express();
const path = require('path');

require("dotenv").config();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());

app.use("/api/register", register)
app.use("/api/login",login)
app.use('/api/students', studentsRoute)


const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

if(process.env.NODE_ENV === "production"){
   
    app.use(express.static("my-app/build"));
    app.get('*',(req,res)=>{
       res.sendFile(path.resolve(__dirname, 'my-app','build','index.html'));
    });
}
app.listen(port, console.log(`server is listening on localHost ${port}`));
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=> console.log("MogoDB connection successful..."))
.catch((err)=>console.log("MongoDB connection failed", err.message));