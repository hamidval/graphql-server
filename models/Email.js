const mongoose = require('mongoose');

const { Schema } = mongoose;
const emailSchema = new Schema({
   
    
    email:String,
    isSendEmail:Boolean
    
});

mongoose.model('Email',emailSchema);