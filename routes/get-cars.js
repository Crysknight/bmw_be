var Car = require('../models/car');

module.exports = function(req, res) {
	Car.find()
		.lean()
		.then(cars => {
			cars = cars.map(car => `<option value="${car.brand}">${car.brand}</option>`).join('');
			cars = '<option value="Выберите марку">Выберите марку</option>' + cars;
			res.send(cars);
		})
		.catch(err => {
			res.status(500).send('Unidentified error');
		})
};