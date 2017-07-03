var Region = require('../models/region');

module.exports = function(req, res) {
	Region.find().populate('admin').sort('name').lean()
		.then(region => {
			// console.log(region);
			if (region === 'end') {
				return;
			} else if (region.length === 0) {
				res.send('<p>Регионов нет</p>');
			} else if (region.length) {
				let resHTML = region.map(region => {
					return (`
						<div class="region span5">
							<div class="region-name">
                ${region.name}
              </div>
              <div class="region-data">
                <h3 class="region-code">Код: ${region.code}</h3>
                <h3>Администратор:</h3>
                <div class="region-admin">
                	<p><b>Логин: </b>${region.admin.login}</p>
	                <p>
	                	<b>Установить пароль: </b>
	                	<input class="set-password" id="set_pwd_${region.admin._id}" />
	                	<input type="submit" class="submit-password" id="submit_pwd_${region.admin._id}" />
	                </p>
	              </div>
                <a href="/admin/region.html?id=${region._id}">Перейти к региону</a>
              </div>
            </div>
					`);
				}).join('');
				res.send(resHTML);
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).send('Unidentified error');
		})
};