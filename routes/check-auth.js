var Region = require('../models/region');

module.exports = function(req, res, next) {
	var pathName = req.originalUrl.replace(/\//, '');
	if (
		(pathName.match(/js|css|fonts|img|font/) !== null &&
		pathName.match(/js|css|fonts|img|font/).index === 0) ||
		pathName === 'page-authentification.html' ||
		pathName === '' ||
		pathName.match('bmw-video') !== null ||
		pathName.match(/admin|api/) !== null
	) {
		next();	
	} else if (!req.cookies.region) {
		res.redirect('/page-authentification.html');
	} else {
		Region.findById(req.cookies.region)
			.then(region => {
				if (!region) {
					res.redirect('/page-authentification.html');
				} else {
					next();
				}
			})
	}

};