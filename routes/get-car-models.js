var Car = require('../models/car');

module.exports = function(req, res) {
	Car.findOne({ brand: req.body.brand })
		.then(car => {
			models = car.models.map(model => `<option value="${model}">${model}</option>`).join('');
			res.send(models);
		})
		.catch(err => {
			console.log(err);
			res.status(500).send('Unidentified error');
		})
};