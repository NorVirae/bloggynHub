const mongoose = require('mongoose');
const { authorize } = require('passport');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    comment:[{
            date:{type:Date, default:Date.now},
            email:{type:String},
            comm:{type:String}
        }],
    
    approved:{
        type:Boolean,
        default:false
    },
    author:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    body: {
        type: String,
        required: true
    },
    contentpreview: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    },
   
  
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;

