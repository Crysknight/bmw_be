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
var moment = require('moment');

var routes = require('./routes');

app.use((req, res, next) => routes.checkAuth(req, res, next));

// Serving build folder with an app in it
app.use(express.static(path.join(__dirname, 'app')));


app.use('/admin/*', (req, res, next) => routes.checkAdmin(req, res, next));

// Serving admin folder with an app in it
app.use('/admin', express.static(path.join(__dirname, 'admin')));

app.use('/api/*', (req, res, next) => routes.checkToken(req, res, next));

app.post('/api/login', (req, res) => routes.login(req, res));

app.post('/api/register', (req, res) => routes.register(req, res));

app.post('/api/add-gift', (req, res) => routes.addGift(req, res));

app.get('/api/get-gifts', (req, res) => routes.getGifts(req, res));

app.post('/api/add-region', (req, res) => routes.addRegion(req, res));

app.post('/api/region-authenticate', (req, res) => routes.regionAuthenticate(req, res));

// app.post('/api/send-sms', (req, res) => routes.sendSMS(req, res));

app.post('/api/initiate-user', (req, res) => routes.initiateUser(req, res));

app.post('/api/check-code', (req, res) => routes.checkCode(req, res));

app.get('/api/get-cars', (req, res) => routes.getCars(req, res));

app.post('/api/get-car-models', (req, res) => routes.getCarModels(req, res));

app.post('/api/complete-user', (req, res) => routes.completeUser(req, res));

app.get('/api/get-regions', (req, res) => routes.getRegions(req, res));

app.post('/api/change-admin-password', (req, res) => routes.changeAdminPassword(req, res));

app.post('/api/get-region', (req, res) => routes.getRegion(req, res));

app.get('/api/get-gifts-admin', (req, res) => routes.getGiftsAdmin(req, res));

app.listen(80);

routes.removeIncompleteUsers();
console.log('Running on port 80... --- ' + moment().format('HH:mm:ss'));
