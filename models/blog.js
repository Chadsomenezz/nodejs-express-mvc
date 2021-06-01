const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//SCHEMA DEFINE THE STRUCTURE
const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    snippet: {
        type:String,
        required:true
    },
    body: {
        type:String,
        required:true
    }
},{timestamps:true});

//THE MODELS SURROUND AND FOLLOW THE STRUCTURE OF SCHEMA
const Blog = mongoose.model("Blog",blogSchema) // will look into blogs plural from the mongodb, need to be Uppercase first letter

module.exports = Blog;
