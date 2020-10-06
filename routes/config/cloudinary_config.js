const cloudinary = require("cloudinary");
require("dotenv").config()

const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CONNECTION_URL,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


module.exports = {cloudinaryConfig, uploader:cloudinary.uploader}