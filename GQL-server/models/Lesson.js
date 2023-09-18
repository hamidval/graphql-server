const mongoose = require('mongoose');

const { Schema } = mongoose;
const lessonSchema = new Schema({
   
    teacher:{type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
    subject:String,
    correction:Number,
    student:{type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
    rateKey:String,
    rate:Number,
    price:Number,
    day:Number,
    startDate:Date,
    endDate:Date,
    isCoverLesson:Boolean,
    fadj:Number,
    padj:Number,
    groupRate: Number,
    groupPrice:Number,
    groupRateKey:String,
    singleRate:Number,
    singlePrice:Number,
    singleRateKey:String,
    lessonType:Number

    
});

mongoose.model('Lesson',lessonSchema);