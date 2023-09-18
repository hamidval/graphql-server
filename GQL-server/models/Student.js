const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
   
    firstName:String,
    lastName:String,
    parent:{type: mongoose.Schema.Types.ObjectId, ref: 'Parent'},
    school:String,
    yearGroup:String,
    generalAbility:Number,
    discount:Number,
    hasLeft:Boolean,
    paymentMethod:Number,
    createdDate:Date

     
    
});

mongoose.model('Student',studentSchema);