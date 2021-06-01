const express = require("express");
const app = express();

const lodash = require("lodash");
const fs = require("fs");
const path = require("path")
const morgan = require("morgan");
const mongoose = require("mongoose");

const Blog = require("./models/blog");

//CONNECT TO MongoDB
const dbURI = `mongodb+srv://netninja:1234@cluster0.yqzc8.mongodb.net/node-tuts?retryWrites=true&w=majority`;
mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true})
    .then((result)=>app.listen(8080,()=>console.log("Listening at port 8080")))
    .catch((err)=>console.log(err));


//mongoose and mongo sandbox routes
app.get("/add-blog",(req,res)=>{
    const blog = new Blog({
        title:"New Richard Blog 1",
        snippet:"About new blog",
        body:"more about my new richard blog"
    });
    blog.save()
        .then((result)=>res.send(result))
        .catch((err)=>console.log(err))

})

app.get("/all-blogs",(req,res)=>{
    Blog.find()
        .then(result=>res.send(result))
        .catch(err=>console.log(err));
})
app.get("/single-blog",(req,res)=>{
    Blog.findById(`60b4f58113a67623ac4cb541`)
        .then(result=>res.send(result))
        .catch(err=>console.log(err));
})


//set view engine
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

//morgan for dev, get the status of req url, status code etc..
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{

    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    //we need to use path __dirname because if we don't the node will access the absolute path of the computer instead of the relative
    //this can't be acces by absolute path
    res.render("index",{title:"Home",blogs});
})

app.get("/about",(req,res)=>{
    res.render("about",{title:"about"});
})

app.get("/blogs/create",(req,res)=>{
    res.render("create",{title:"create a new blog"})
})

app.use((req,res)=>{
    res.statusCode = 404;
    res.render('404',{title:"404"});
})