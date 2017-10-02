var Gift = require('../models/gift');

module.exports = function(req, res) {
	Gift.find().where('quantity').ne(0)
		.then(gifts => {
			// res.json(gifts);
			let resHTML = `
				<div class="gifts">
			`;
			for (let gift of gifts) {
				resHTML += `
					<div>
						<div class='gift-image'><img src='/img/${gift.image}' alt='' class='slider__image'></div>
						<div class='gift-content'>
							<h4 class='title title_sub title_sub_black'>${gift.name}</h4>
							${gift.description}
						</div>
						<div class="gift-quantity">Количество: ${gift.quantity}</div>
					</div>
				`;
			}
			resHTML += `
				</div>
			`;
			res.send(resHTML);
		})
		.catch(err => {
			console.log(err);
			res.status(500).send('Unidentified error');
		})
};