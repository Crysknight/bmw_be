var User = require('../models/user');

module.exports = function(req, res, next) {
	var pathName = req.originalUrl.replace(/\/admin\//, '');
	if (
		(pathName.match(/js|css|fonts|img|font/) !== null &&
		pathName.match(/js|css|fonts|img|font/).index === 0) ||
		pathName === 'login.html'
	) {
		next();	
	} else {
		User.findOne({ token: req.cookies.token })
			.then(user => {
				if (!user) {
					res.redirect('/admin/login.html');
				} else {
					next();
				}
			})
			.catch(err => {
				res.status(500).send('Unidentified error');
			});		
	}

};