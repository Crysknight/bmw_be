var Admin = require('../models/admin');

module.exports = function(req, res, next) {
	var pathName = req.originalUrl.replace(/\/admin\//, '');
	if (
		(pathName.match(/js|css|fonts|img|font/) !== null &&
		pathName.match(/js|css|fonts|img|font/).index === 0) ||
		pathName === 'login.html'
	) {
		next();	
	} else if (!req.cookies.token) {
		res.redirect('/admin/login.html');
	} else {
		console.log(pathName);
		Admin.findOne({ token: req.cookies.token })
			.then(admin => {
				// console.log(admin);
				if (!admin) {
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