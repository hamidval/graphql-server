const mongoose = require('mongoose');
const { Schema } = mongoose;

const teacher = new Schema({
   
    fullName:String,
    userId:String,
    email:String,
    bonus:Number,
    role:Number,
    createdDate:Date
    
});

mongoose.model('Teacher',teacher);