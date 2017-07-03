var Admin = require('../models/admin');

const globalAdminPaths = [
	'change-admin-password',
	'add-region',
	'add-gift',
	'get-regions',
	'register'
];

const regionalAdminPaths = [
	'get-region'
];

const freePaths = [
	'check-code',
	'complete-user',
	'get-car-models',
	'get-cars',
	'get-gifts',
	'initiate-user',
	'login',
	'region-authenticate'
];

module.exports = function(req, res, next) {
	let pathName = req.originalUrl.replace(/\/api\//, '');
	let isGlobalAdminPath = false;
	let isRegionalAdminPath = false;
	let isFreePath = false;
	for (path of freePaths) {
		if (path === pathName) {
			isFreePath = true;
		}
	}
	for (path of globalAdminPaths) {
		if (path === pathName) {
			isGlobalAdminPath = true;
		}
	}
	for (path of regionalAdminPaths) {
		if (path === pathName) {
			isRegionalAdminPath = true;
		}
	}
	if (isFreePath) {
		next();
		return;
	}
	if (!req.cookies.token) {
		res.status(401).send('Unauthorized');
		return;
	}
	Admin.findOne({ token: req.cookies.token })
		.then(admin => {
			if (!admin) {
				res.status(401).send('Unauthorized');
			} else if (admin.role === 'global_admin' && isGlobalAdminPath) {
				// console.log('passed global admin');
				next();
			} else if ((admin.role === 'regional_admin' || admin.role === 'global_admin') && isRegionalAdminPath) {
				next();
			} else {
				res.status(401).send('Unprivileged');
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).send('Unidentified error');
		});
};