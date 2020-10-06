// main server page
const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const mongoose = require('mongoose');
const User = require("./models/User");
const msg = require('./models/msgS');
const Post = require('./models/Post');
require("dotenv").config()
// const ejsLint = require("ejs-lint")
// ejsLint(expressLayouts)
//made some changes to the code
// config DB
// "mongodb://localhost:27017/blognhub"
// "mongodb+srv://virae:C@list5r@nhublogger.xme4w.mongodb.net/test"
mongoose.connect("mongodb+srv://virae:C@list5r@nhublogger.xme4w.mongodb.net/test",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("connected to DB");
    }).catch((err) => {
        console.log(err);
    });
// express
const app = express();

// passport config
require("./config/passport")(passport);

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// bodyParser
app.use(express.urlencoded({ extended: false }));

// Express-session
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());
const fetchDatas = async ()=>{
    const allUsers = await User.find()
    return allUsers

}
const fetchposts = async ()=>{
    const allUsers = await Post.find()
    return allUsers

}
const fetchMessages = async ()=>{
    const allMsgs = msg.find()
    return allMsgs
}
// Global vars
//using async funtions to await promises courtesy of virae
app.use(async (req,res, next) => {
    const listUsers = await fetchDatas()
    const listMsgs = await fetchMessages()
    const listPosts = await fetchposts()

    // console.log(listUsers)
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    res.locals.allThePeople = listUsers;
    res.locals.allTheMessages = listMsgs;
    res.locals.allPosts = listPosts;
    res.locals.msg = '';
    res.locals.imageLink = '';



    next();
})

// public (stylesheets)
app.use("/public",express.static(__dirname + "/public"));




// === Routes ====
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
// app.use("/", require("./routes/admin"));
// app.use("/", require("./routes/blogLayout"));

// app.get("*", (req,res)=>{
//     res.send("doesn't exist yet");
// })
const port = process.env.PORT||5000

app.listen(port, () => {
    console.log("blognub server started..."+process.env.API_KEY);
})
