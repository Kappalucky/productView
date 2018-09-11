// Imported node modules
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const request = require('request');
const cloudinary = require('cloudinary');

// Express app
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ exended: false }));
const multipartMiddleware = multipart();

// Cloudinary

cloudinary.config({
  cloud_name: 'CLOUDINARY_CLOUD_NAME',
  api_key: 'CLOUDINARY_API_KEY',
  api_secret: 'CLOUDINARY_API_SECRET',
});

// Routes

app.get('/products', multipartMiddleware, function(req, res) {
  return res.json([
    { id: '1', name: 'UltraLight Mechanical Keyboard' },
    { id: '121', name: 'Iphone X' },
    { id: '23', name: 'Tesla S' },
    { id: '42', name: 'Work Shoes' },
  ]);
});

app.get('/getProductInfo/:id', multipartMiddleware, function(req, res) {
  // here you display the form to create the new product
  // collect product name and ask them to upload pictures and videos
  console.log(req.params.id);
  return res.json({
    media: [
      {
        id: '0',
        type: 'image',
        url: 'https://static.pexels.com/photos/265631/pexels-photo-265631.jpeg',
      },
      {
        id: '1',
        type: 'image',
        url: `https://res.cloudinary.com/${
          process.env.CLOUD_NAME
        }/image/upload/s--MboYeISD--/v1517601503/keyboard-type-computer-internet-159356_lscewc.jpg`,
      },
      {
        id: '2',
        type: 'image',
        url: `https://res.cloudinary.com/${
          process.env.CLOUD_NAME
        }/image/upload/s--rgWanpqS--/v1517601521/pexels-photo_uqllqz.jpg`,
      },
      {
        id: '3',
        type: 'video',
        url: `http://res.cloudinary.com/${
          process.env.CLOUD_NAME
        }/video/upload/s--ZWPqo282--/v1514966645/sea_turtle-short_z1pr4o.mp4`,
      },
    ],
    product_name: 'Ultra Thin Mechanical Keyboard',
    product_desc: 'This keyboard gives you the clack to your click',
    product_price: '200',
  });
});

// Port

let port = 3128 || process.env.PORT;

app.listen(port, function() {
  console.log('App listening on port ' + port + '!');
});
