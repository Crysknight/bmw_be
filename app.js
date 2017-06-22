var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// var multer = require('multer');
var mongoose = require('mongoose');

var routes = require('./routes');


// Serving build folder with an app in it
app.use(express.static(path.join(__dirname, 'app')));

app.use('/admin/*', (req, res, next) => routes.checkAdmin(req, res, next));

// Serving admin folder with an app in it
app.use('/admin', express.static(path.join(__dirname, 'admin')));

app.post('/api/login', (req, res) => routes.login(req, res));

app.post('/api/register', (req, res) => routes.register(req, res));

app.post('/api/add-gift', (req, res) => routes.addGift(req, res));

app.post('/api/get-gifts', (req, res) => routes.getGifts(req, res));

app.listen(80);
console.log('Running on port 80...');