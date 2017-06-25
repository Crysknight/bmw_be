var SMSru = require('sms_ru');

module.exports = function(req, res) {
	var sms = new SMSru('489A3B24-396D-FEFB-DFF9-593FB9C4A6B3');
	sms.sms_send({
		to: '79268875671',
		// from: 'Клык Аиравы',
		text: req.body.message
	}, function(e) {
		console.log(e);
	});
};