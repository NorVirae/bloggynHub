const express = require("express");
const Post = require("../models/Post");

const router = express.Router();


router.get("/", (req, res) => {
    Post.find({}, (err, post) => {
      res.render("landing", {
        post,
        
         
        
      });
    });
  });

module.exports = router;