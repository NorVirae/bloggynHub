const mongoose = require("mongoose");
// addin a schema for messages
const msgSchema = new mongoose.Schema({
    msg : {
        type:String
    },
    email: {
        type:String,
        required:true
    }
})

const msg = mongoose.model("msg", msgSchema)
module.exports = msg;