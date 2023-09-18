const mongoose = require('mongoose');
const { Schema } = mongoose;

const parentSchema = new Schema({
   
    firstName:String,
    lastName:String,
    email:String,
    createdDate:Date

    
    
});

mongoose.model('Parent',parentSchema);