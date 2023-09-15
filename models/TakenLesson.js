const mongoose = require('mongoose');


const { Schema } = mongoose;
const takenLessonSchema = new Schema({
   
    teacher:{type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
    subject:String,
    correction:Number,
    student:{type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
    rateKey:String,
    price:Number,
    rate:Number,
    hours:Number,
    date:Date,
    discount:Number,
    day:Number,
    isExtra:Boolean,
    payPerLesson:Number,
    feePerLesson:Number,
    setLessonType:Number,
    actualLessonType:Number
    
});

mongoose.model('TakenLesson',takenLessonSchema);