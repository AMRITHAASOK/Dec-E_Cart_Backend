//import mongoose
const mongoose = require('mongoose')
//define schema for product collection 
const wishlistSchema = new mongoose.Schema({
    
    id:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    
    image:{
        type:String,
        required:true,
    },

})
//create a model to store data
const wishlists=new mongoose.model("wishlists",wishlistSchema)
//export model
module.exports = wishlists