const mongoose = require('mongoose');
const Review = require('./review');

//schema
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true,
        min:0
    },
    auther:{
        type:String,
        required:true
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]

});
//model
const Product = mongoose.model('Product',productSchema);

module.exports = Product;