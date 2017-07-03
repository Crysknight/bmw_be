var Region = require('../models/region');
var User = require('../models/user');

module.exports = function(req, res) {
	// console.log(req.body);
	// res.send('ok');
	let resHTML = '';
	let query = {};
	if (req.body.id) {
		query = {
			_id: req.body.id
		}
	} else if (req.body.adminId) {
		query = {
			admin: req.body.adminId
		}
	} else {
		res.status(400).send('wrong id');
		return;
	}
	Region.findOne(query)
		.then(region => {
			if (!region) {
				res.status(400).send('wrong id');
				return 'end';
			} else {
				resHTML += `
					<div class="single-region span10">
						<div class="region-name">
							<div class="name">${region.name}</div>
							<div class="region-code">КОД: ${region.code}</div>
						</div>
						<div class="gifts">
							<h3>Заказанные подарки</h3>
							<div class="accordion" id="gifts_accordion">
				`;
				return User.find({ region: region._id }).populate('gift');
			}
		})
		.then(users => {
			if (users === 'end') {
				return 'end';
			} else {
				for (user of users) {
					let phoneFormatted = user.phone.split('').map((number, i) => {
						switch (i) {
							case 0: {
								number = '+' + number + ' ';
								break;
							}
							case 1: {
								number = '(' + number;
								break;
							}
							case 3: {
								number += ') ';
								break;
							}
							case 6: {
								number += '-';
								break;
							}
							case 8: {
								number += '-';
								break;
							}
						}
						return number;
					}).join('');
					resHTML += `
								<div class="accordion-group gift">
									<div class="accordion-heading">
										<a class="accordion-toggle" data-toggle="collapse" data-parent="#gifts_accordion" href="#collapse${user._id}">
											<span class="gift-name">${user.gift.name}</span>
											<span class="user-name">${user.fullName.lastName} ${user.fullName.name} ${user.fullName.patronymic || ''}</span>
										</a>
									</div>
									<div id="collapse${user._id}" class="accordion-body collapse">
										<div class="accordion-inner">
											<p><h4>Город: </h4>${user.city}</p>
											<p><h4>Телефон: </h4>${phoneFormatted}</p>
											<p><h4>E-Mail: </h4>${user.email || 'Не указан'}</p>
											<p><h4>Обращение: </h4>${user.gender}</p>
											<div class="user-car">
												<h4>Автомобиль: </h4>
												<p>Бренд: ${user.car.brand}</p>
												<p>Модель: ${user.car.model}</p>
											</div>
										</div>
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
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).send('Unidentified error');
		})
};

				// <div class="accordion" id="accordion2">
		  //     <div class="accordion-group">
		  //       <div class="accordion-heading">
		  //         <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">
		  //           Collapsible Group Item #1
		  //         </a>
		  //       </div>
		  //       <div id="collapseOne" class="accordion-body collapse in">
		  //         <div class="accordion-inner">
		  //           It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
		  //         </div>
		  //       </div>
		  //     </div>
		  //     <div class="accordion-group">
		  //       <div class="accordion-heading">
		  //         <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">
		  //           Collapsible Group Item #2
		  //         </a>
		  //       </div>
		  //       <div id="collapseTwo" class="accordion-body collapse">
		  //         <div class="accordion-inner">
		  //           Anim pariatur cliche...
		  //         </div>
		  //       </div>
		  //     </div>
		  // 	</div>