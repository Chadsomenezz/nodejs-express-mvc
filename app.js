const express = require("express");
const app = express();
const lodash = require("lodash");
const fs = require("fs");
const path = require("path")
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const config = require("./config");

//Connect to MongoDB using Mongoose
(async () =>{
    const dbURI = `mongodb+srv://${config.db.username}:${config.db.password}@cluster0.yqzc8.mongodb.net/node-tuts?retryWrites=true&w=majority`;
    try{
        //WILL wait first to see if we can connect to DB, else log error
        await mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true})
        app.listen(config.port,()=>console.log(`Listening at port ${config.port}`));
    }catch (err){
        console.log(err);
    }
})()

//set view engine
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

//morgan for dev, get the status of req url, status code etc..
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,"public")))

//routes
app.get("/",(req,res)=>{
    res.redirect("/blogs")
})

app.get("/about",(req,res)=>{
    res.render("about",{title:"about"});
})

app.use(express.urlencoded({extended:true}));
//blog routes


//blog routes
app.use("/blogs",blogRoutes);

//if user go to view that doesn't exist
app.use((req,res)=>{
    res.statusCode = 404;
    res.render('404',{title:"Page not found"});
})