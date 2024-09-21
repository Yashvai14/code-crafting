const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app = express()
app.use(express.static(__dirname))
app.use(express.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://127.0.0.1:27017/Registrations')
const db = mongoose.connection
db.once('open',()=>{
    console.log("mongodb connection successful")
})

const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    department:String,
    semester:String,
    email:String,
    phone:String,
    gender:String,
    experience:String,

})

const Users = mongoose.model("Data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/post',async(req,res)=>{
    const {first_name,last_name,department,semester,email,phone,gender,experience,} =req.body
    const user = new  Users({
        first_name,
        last_name,
        department,
        semester,
        email,
        phone,
        gender,
        experience,

    })
    await user.save()
    console.log(user)
    res.send("Form Submittion Successful.")
})

app.listen(port,()=>{
    console.log("server started")
})