var login = require('./login');
var register = require('./register');
var checkAdmin = require('./check-admin');
var checkAuth = require('./check-auth');
var addGift = require('./add-gift');
var getGifts = require('./get-gifts');
var addRegion = require('./add-region');
var regionAuthenticate = require('./region-authenticate');
var sendSMS = require('./send-sms');
var initiateUser = require('./initiate-user');
var checkCode = require('./check-code');
var getCars = require('./get-cars');
var getCarModels = require('./get-car-models');
var completeUser= require('./complete-user');
var removeIncompleteUsers = require('./remove-incomplete-users');
var getRegions = require('./get-regions');
var changeAdminPassword = require('./change-admin-password');
var checkToken = require('./check-token');
var getRegion = require('./get-region');

module.exports = {
	login,
	register,
	checkAdmin,
	checkAuth,
	addGift,
	getGifts,
	addRegion,
	regionAuthenticate,
	sendSMS,
	initiateUser,
	checkCode,
	getCars,
	getCarModels,
	completeUser,
	removeIncompleteUsers,
	getRegions,
	changeAdminPassword,
	checkToken,
	getRegion
};