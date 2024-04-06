// const cloudinary = require('cloudinary').v2

// exports.cloudinaryConfig = () => {
//   return cloudinary.config({
//     cloud_name: 'ddqoqjwcf', 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET 
//   })
// }
const cloudinary = require('cloudinary').v2;

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: 'ddqoqjwcf',
    api_key: '214723445242532',
    api_secret: 'PnroVBZYTLc-x5Kbemacu29NDTo'
  });
  
  return cloudinary;
};

module.exports = { cloudinaryConfig };




