const express = require("express");
const router = express.Router();


router.get("/blogLayout", (req,res)=>{
    res.render("blogLayout");
});

module.exports = router;