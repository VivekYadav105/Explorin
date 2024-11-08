const cloudinary = require('cloudinary').v2;
const multer = require('multer')
const path = require('path')
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {

        const folderPath = `${'profilepics'}`; // Update the folder path here
        const fileExtension = path.extname(file.originalname).substring(1);
        const publicId = `${file.fieldname}-${Date.now()}`;
        
        return {
          folder: folderPath,
          public_id: publicId,
          format: fileExtension,
        }
    }
  
  });
   
const parser = multer({ storage: storage });

module.exports = {parser}