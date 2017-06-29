var User = require('../models/user');

const lettersMap = {
	'а': 'A',
	'А': 'A',
	'в': 'B',
	'В': 'B',
	'е': 'E',
	'Е': 'E',
	'с': 'C',
	'С': 'C'
};

module.exports = function(req, res) {
	let code = req.body.code.toUpperCase();
	for (letter in lettersMap) {
		let re = new RegExp(letter, 'g');
		code = code.replace(re, lettersMap[letter]);
	}
	console.log(code);
	User.findOne({ code })
		.then(user => {
			if (!user) {
				res.status(401).send('wrong code');
			} else {
				res.send('ok');
			}
		})
};