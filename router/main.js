var config = {
	titulo: 'Projeto Series',
	homeSelected: '',
	amigosSelected: '',
	seriesSelected: ''
}

module.exports = function(app) {
	app.get('/', goToIndex);
	app.get('/index', goToIndex);

	// parte das series
	app.get('/series', function(req, res) {
		config.homeSelected = '';
		config.amigosSelected = '';
		config.seriesSelected = 'active';

		res.render('listaSeries', config);
	});
	app.param('serieId', function(req, res, next, serieId) {
		// check if the user with that name exists
		// do some validations
		// add -dude to the name
		//var modified = name + '-dude';
		// save name to the request
		//req.name = modified;

		// aqui verifica se a serie informada existe
		next();
	});
	app.get('/series/:serieId', function(req, res) {
		// the user was found and is available in req.user
		//res.send('Não implementado');
		res.redirect('/erroserie');
	});
	app.get('/erroserie', function(req, res) {
		config.homeSelected = '';
		config.amigosSelected = '';
		config.seriesSelected = '';

		res.render('serieNaoEncontrada', config);
	});
}

function goToIndex (req, res) {
	config.homeSelected = 'active';
	config.amigosSelected = '';
	config.seriesSelected = '';

	res.render('index', config);
}