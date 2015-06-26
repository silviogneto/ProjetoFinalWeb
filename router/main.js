var config = {
	titulo: 'Projeto Series',
	homeSelected: '',
	amigosSelected: '',
	seriesSelected: '',
	procuraVisible: ''
};

module.exports = function(app) {
	app.get(['/', '/index'], function(req, res) {
		config.homeSelected = 'active';
		config.amigosSelected = '';
		config.seriesSelected = '';
		config.procuraVisible = 'hide';

		var sess = req.session;
		if (sess.logado) {
			//console.log('usuario está logado');
		} else {
			//console.log('usuario deslogado');
		}

		res.render('index', config);
	});

	// parte das series
	app.get('/series', function(req, res) {
		config.titulo = 'Lista de Séries'
		config.homeSelected = '';
		config.amigosSelected = '';
		config.seriesSelected = 'active';
		config.procuraVisible = '';
		res.render('listaSeries', config);
	});
	app.get('/seriesJaVistas', function(req, res) {
		config.titulo = 'Lista das Séries já vistas'
		config.homeSelected = '';
		config.amigosSelected = '';
		config.seriesSelected = 'active';
		config.procuraVisible = '';
		res.render('listaSeriesJaVistas', config);
	});
	app.get('/seriesDesejoVer', function(req, res) {
		config.titulo = 'Lista das Séries que desejo ver'
		config.homeSelected = '';
		config.amigosSelected = '';
		config.seriesSelected = 'active';
		config.procuraVisible = '';
		res.render('listaSeriesDesejoVer', config);
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
		config.titulo = 'Série'
		config.homeSelected = '';
		config.amigosSelected = '';
		config.seriesSelected = 'active';
		config.procuraVisible = 'hide';
		res.render('cadastraSerie', config);
	});
	app.get('/erroserie', function(req, res) {
		config.homeSelected = '';
		config.amigosSelected = '';
		config.seriesSelected = '';
		config.procuraVisible = 'hide';

		res.render('serieNaoEncontrada', config);
	});

	// controle de usuario
	app.post('/login', function(req, res) {
		var sess = req.session,
			user = require('./../model/userModel');

		user.validarUsuario(req.body.usuario, req.body.senha,  function(rows, fields) {
			console.log(rows.length);
			res.send('' + rows.length);
		});

		console.log('usuario que tentou fazer login: ' + req.body.usuario);
		console.log('tentou fazer login');
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