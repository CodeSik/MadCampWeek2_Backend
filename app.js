var express = require('express');
const app = express();
var db= require('./db');


const UserController = require('./user/UserController');  // 추가
const PhoneBookController = require('./phonebook/PhoneBookController')
const GalleryController = require('./gallery/GalleryController')
const DownloadController = require('./uploads/DownloadController')

//라우팅
app.use('/users', UserController);  // 추가
app.use('/phonebook',PhoneBookController);
app.use('/gallery',GalleryController);
app.use('/uploads',DownloadController);
module.exports = app;