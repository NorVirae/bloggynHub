const express = require("express");
const bcrypt = require("bcryptjs");

// const User = require("../models/User")
const router = express.Router();
const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");
const msg = require("../models/msgS")
const Datauri = require("datauri")
const  cloudinary_config = require("./config/cloudinary_config")
const path = require("path")
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// User model
const User = require("../models/User.js");
const multer = require("multer");
const Post = require("../models/Post");
const { uploader } = require("./config/cloudinary_config");


// login route
router.get("/login", (req, res) => {
    res.render("login.ejs");
})

router.post("/handle", async (req, res)=>{
    // console.log(req.body)
    const newAdmin = await User.updateOne({email:req.body.email},{isAdmin:true})
    res.render("adminPanel")
})
router.post("/approve", async (req, res)=>{
    // console.log(req.body)
    const newPost = await Post.updateOne({_id:req.body.id},{approved:true})
    res.render("blogLog",{msg:"success post has been published"})
})

router.get("/listall", async (req, res)=>{
    
    const newAdmin = await User.find()
    res.send(newAdmin)
})
router.get("/remove", async (req, res)=>{
    
    const newAdmin = await User.remove()
    res.send(newAdmin)
})

router.post("/feedback",async (req, res)=>{
    try{console.log(req.body)
    const newMsg = new msg({
        msg:req.body.message,
        email:req.body.email
    })
    console.log(req.body.message)
    const createdMessage = await newMsg.save()
    res.redirect("/")}
    catch(error){
        res.send(error)
    }

})
router.get("/comment", async (req, res)=>{
    // const checkIt = await Post.findOne({_id:req.body.id})
    // const newLike = await Post.updateOne({_id:req.body.id},{like:checkIt.like+1})
    // res.redirect("/")
    const commentList = {date:Date.now(), email:"myEmail", comm:"he JUST Wants attention"}
    const checkComment = await Post.updateOne({_id:"1601631448874"},{$push:{comment:commentList}})
    res.send(checkComment)    

})
router.get("/chats", async (req, res)=>{
    res.render("chats")
})
router.get("/bloglog", async (req, res)=>{
    res.render("blogLog")
})
router.get("/viewfeedback", async (req, res)=>{
    const allMsg = await msg.find()
    res.send(allMsg)
})
router.get("/removefeedback", async (req, res)=>{
    const allMsg = await msg.remove()
    res.send(allMsg)
})
router.post("/login", async (req,res, next)=>{
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/users/login",
        failureFlash: true
    })(req,res,next);
    // console.log(req.user)
    const collect  = await User.findOne({
        email:req.body.email
    })
    // if (collect.isAdmin){
    // res.render("adminPanel", {collect})}
})
router.get("/env", (req,res,next)=>{
    res.send(process.env.API_SECRET)
    
})
// register routes
router.get("/register", (req, res) => {
    res.render("register.ejs");
})
router.get("/createadmin", async (req, res) => {
    const admin = new User ({
        name:'cleo',
        email:"admin@gmail.com",
        password:"$2a$10$t8XVMNAv1KMoFgqCBva06uql6.9gXU8yXLeT7VR3kvzqB6jeCS8uq",
        isAdmin:true
    })

    const newAdmin = await admin.save()

    res.send(newAdmin)
})

router.post("/register", (req, res) => {
    var { name, email, password } = req.body;
    var errors = [];

    // form validation
    // check required fields 
    if (!name || !email || !password) {
        errors.push({ msg: 'please fill in all fields ' });
    }
    // check password length
    if (password.length < 6) {
        errors.push({ msg: 'password should be at least 6 characters' });
    }
    if (errors.length > 0) {
        res.render('register', { errors, name, email, password });
    }
    else {
        // validation passes
        User.findOne({ email: email })
            .then((user) => {
                if (user) {
                    // user exists
                    errors.push({ msg: 'email has already been registered' });
                    res.render("register", {
                        errors, name, email, password
                    })
                }
                else {
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) throw err;
                        else {
                            const newUser = new User({ name, email, password }, (err, newUser) => {
                                if (err) throw err;
                                console.log(newUser.password);

                            })
                            bcrypt.hash(req.body.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                // save user
                                newUser.save(function (err, data) {
                                    req.flash('success_msg', 'you have successfully logged in');
                                    res.redirect("/users/login");
                                });
                            })
                        }
                    })
                }
            });
    }

})

router.get("/newpost",(req, res) => {
    res.render("newpost");
})

let nameFile = ''
// const storage = multer.diskStorage({
//     filename:(req, file, cb)=>{
//         nameFile = file.fieldname +Date.now()+file.originalname
//         cb(null, nameFile )
//     },
//     destination:(req, file, cb)=>{
//         cb(null,__dirname+"/images")
//     }
// })
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

console.log(process.env.API_)

 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file)=> {
    console.log(file)
    let Ftype = ""
    if (path.extname(file.originalname) == ".jpg"){
        Ftype = "jpg"
    }else if (path.extname(file.originalname)== ".ico"){
        Ftype = "ico"
    }
    return {folder: 'blog_images',
    format:Ftype,
    public_id: Date.now(),}
  },
});

const upload = multer({storage:storage})

// const Duri = Datauri()

// const DataU = req=> Duri.format(path.extname(req.file.originalname).toString(),req.file.buffer)

router.post("/imageupload",upload.single("blogImage"), (req, res, next)=>{
    
    res.render("newpost",{imageLink:req.file.path})
})
router.get("/imageshow/:id", (req,res)=>{
    res.sendFile(__dirname+"/images/"+req.params.id)
})
router.get("/logout", (req,res)=>{
    req.logout();
    req.flash("success_msg", "you are logged out ");
    res.redirect("/login");
})
router.get("/adminDashboard", (req,res)=>{
    res.render("adminPanel", {currentUser: req.user});
    console.log(req.user)
})
router.post("/newpost", (req, res) => {
    const { title, image, body, contentpreview,email,author } = req.body;
    console.log(req.body)
      const newPost = new Post({
        title,
        image,
        body,
        email,
        author,
        contentpreview
      });
      
      // console.log(req.body);
    
        // SAVE USER
        newPost
        .save()
        .then(user => {
          req.flash(
            "success_msg",
            "You sucessfully created a post"
          );
          res.redirect("/users/newpost");
        })
    
    });

    
      
      
      router.get("/removepost", async (req, res)=>{
          const rmoved = await Post.remove()
          res.send(rmoved)
      })
      //BLOG PAGE
      
      // specific post route
      router.get("/:id",async (req,res)=>{
        let title=req.params.id;
        console.log(title)
        const blogList = await Post.find()
        Post.findOne({_id:title},(err,post)=>{
          if (err) throw err;
          else{
              console.log(blogList)
            res.render("blogLayout",{post, blogList})


          }
        })
      })
      
      //USERS INDEX PAGE
      
      router.get("/usersindex", (req, res) => {
        Post.find({}, (err, post) => {
          res.render("usersindex", {
            post,
            
             
            
          });
        });
      });

      



module.exports = router;
