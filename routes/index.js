var login = require('./login');
var register = require('./register');
var checkAdmin = require('./check-admin');
var addGift = require('./add-gift');
var getGifts = require('./get-gifts');
var addRegion = require('./add-region');
var regionAuthenticate = require('./region-authenticate');
var sendSMS = require('./send-sms');

module.exports = {
	login,
	register,
	checkAdmin,
	addGift,
	getGifts,
	addRegion,
	regionAuthenticate,
	sendSMS
};