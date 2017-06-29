var Gift = require('../models/gift');

module.exports = function(req, res) {
	Gift.find().where('quantity').ne(0)
		.then(gifts => {
			// res.json(gifts);
			var resHTML = `
				<div class='container'>
					<div class='slider'>
						<div class="slider__nav menu">
			`;
			for (let gift of gifts) {
				let name = gift.name.slice(0, 35);
				if (name !== gift.name) {
					name = name.trim() + '...';
				}
				resHTML += `
							<div class='menu__list-item menu__list-item_slider'><a href='#' class='menu__link menu__link_slider'>
								${name}
							</a></div>
				`;
			}
			resHTML += `
						</div>
						<div class='slider__tape'>
			`;
			for (let gift of gifts) {
				resHTML += `
							<div>
								<div class='slider__image-box'><img src='img/bear.jpg' alt='' class='slider__image'></div>
								<div class='slider__content-box'>
									<h4 class='title title_sub title_sub_black'>${gift.name}</h4>
									${gift.description}
									<button id='gift_${gift._id}' class='button button_slider'>Выбрать этот сувенир</button>
								</div>
							</div>
				`;
			}
			resHTML += `
						</div>
					</div>
				</div>
			`;
			res.send(resHTML);
		})
		.catch(err => {
			console.log(err);
			res.status(500).send('Unidentified error');
		})
};