const mongoose = require('mongoose');

const { Schema } = mongoose;
const invoiceSchema = new Schema({
   
    parent:{type: mongoose.Schema.Types.ObjectId, ref: 'Parent'},
    month:Number,
    year:Number,
    issueDate:Date,
    data:Buffer,
    total:Number,
    paidStatus:Number,
    paymentAmount:Number,
    sent:Number,
    created:Number,
    invoiceIndex:String
    
});

mongoose.model('Invoice',invoiceSchema);