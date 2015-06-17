var config = {
	titulo: 'Projeto Series',
	homeSelected: '',
	amigosSelected: '',
	seriesSelected: ''
}

module.exports = function(app) {
	app.get('/', goToIndex);
	app.get('/index', goToIndex);

	app.get('/series', function(req, res) {
		config.homeSelected = '';
		config.amigosSelected = '';
		config.seriesSelected = 'active';

		res.render('listaSeries', config);
	});
}

function goToIndex (req, res) {
	config.homeSelected = 'active';
	config.amigosSelected = '';
	config.seriesSelected = '';

	res.render('index', config);
}