var config = {
	titulo: 'Projeto Series',
	homeSelected: '',
	amigosSelected: '',
	seriesSelected: '',
	procuraVisible: '',
	usuarioLogado: false
};

module.exports = function(app) {
	app.get(['/', '/index'], function(req, res) {
		config.homeSelected = 'active';
		config.amigosSelected = '';
		config.seriesSelected = '';
		config.procuraVisible = 'hide';

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
			if (rows.length > 0) {
				sess.user = req.body.usuario;
				sess.logado = true;
				config.usuarioLogado = true;
			} else {
				sess.user = '';
				sess.logado = false;
				config.usuarioLogado = false;
			}

			res.send('' + rows.length);
		});
	});

	app.post('/logout', function(req, res) {
		config.usuarioLogado = false;
		req.session.destroy(function(err) {
			if (err) {
				console.log(err);
			} else {
				res.redirect('/');
			}
		});
	});

	app.get('/retornarseries', function(req, res) {
		var serie = require('./../model/serieModel'),
			pagina = Number(req.query.pagina) || 0,
			qtdRegistros = Number(req.query.qtdRegistros) || 0;

		serie.buscarSeries(pagina, qtdRegistros, function(rows, fields) {
			res.send('{"serie":' + JSON.stringify(rows) + '}');
		});
	});
}