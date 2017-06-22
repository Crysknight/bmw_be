var Gift = require('../models/gift');

module.exports = function(req, res) {
	Gift.find().where('quantity').ne(0)
		.then(gifts => {
			// res.json(gifts);
			var resHTML = `
				<div class='content content_gift'>
					<div class='container'>
						<div class='slider'>
							<div class="slider__nav menu">
			`;
			for (let i of gifts) {
				resHTML += `
								<div class='menu__list-item menu__list-item_slider'><a href='#' class='menu__link menu__link_slider'>
									${i.name}
								</a></div>
				`;
			}
			resHTML += `
							</div>
							<div class='slider__tape'>
			`;
			for (let i of gifts) {
				resHTML += `
					<div>
						<div class='slider__image-box'
					</div>
				`;
			}

		})
		.catch(err => {
			console.log(err);
			res.status(500).send('Unidentified error');
		})
};