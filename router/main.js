var config = {
	titulo: 'Projeto Series',
	homeSelected: '',
	amigosSelected: '',
	seriesSelected: ''
};

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
		//res.redirect('/erroserie');
		config.homeSelected = '';
		config.amigosSelected = '';
		config.seriesSelected = 'active';
		res.render('cadastraSerie',config);
	});
	app.get('/erroserie', function(req, res) {
		config.homeSelected = '';
		config.amigosSelected = '';
		config.seriesSelected = '';

		res.render('serieNaoEncontrada', config);
	});

	// controle de usuario
	app.post('/login', function(req, res) {
		var sess = req.session;

		console.log('usuario que tentou fazer login: ' + req.body.usuario);
		console.log('tentou fazer login');

		res.send('end');
	});
	app.get('/logout', function(req, res) {
		req.session.destroy(function(err) {
			if (err) {
				console.log(err);
			} else {
				res.redirect('/');
			}
		});
	});
}

function goToIndex (req, res) {
	config.homeSelected = 'active';
	config.amigosSelected = '';
	config.seriesSelected = '';

	var sess = req.session;
	if (sess.logado) {
		//console.log('usuario está logado');
	} else {
		//console.log('usuario deslogado');
	}

	res.render('index', config);
}