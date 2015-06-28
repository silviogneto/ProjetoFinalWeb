var config = {
	titulo: 'Projeto Series',
	homeSelected: '',
	amigosSelected: '',
	seriesSelected: '',
	procuraVisible: '',
	usuarioLogado: false,
	serie : {}
};

module.exports = function(app) {
	app.get(['/', '/index'], function(req, res) {
		config.homeSelected = 'active';
		config.amigosSelected = '';
		config.seriesSelected = '';
		config.procuraVisible = 'hide';
		config.usuarioLogado = req.session.logado;

		res.render('index', config);
	});

	// parte das series
	app.get('/series', function(req, res) {
		config.titulo = 'Lista de Séries'
		config.homeSelected = '';
		config.amigosSelected = '';
		config.seriesSelected = 'active';
		config.procuraVisible = '';
		config.usuarioLogado = req.session.logado;

		res.render('listaSeries', config);
	});
	app.get('/seriesJaVistas', function(req, res) {
		config.titulo = 'Lista das Séries já vistas'
		config.homeSelected = '';
		config.amigosSelected = '';
		config.seriesSelected = 'active';
		config.procuraVisible = '';
		config.usuarioLogado = req.session.logado;

		res.render('listaSeriesJaVistas', config);
	});
	app.get('/seriesDesejoVer', function(req, res) {
		config.titulo = 'Lista das Séries que desejo ver'
		config.homeSelected = '';
		config.amigosSelected = '';
		config.seriesSelected = 'active';
		config.procuraVisible = '';
		config.usuarioLogado = req.session.logado;

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

		var serie = require('./../model/serieModel'),
			serieId = Number(req.params.serieId) || 0;

		serie.buscarSerie(serieId, function(rows, fields) {

			if (rows.length > 0)
			{
				config.serie = rows[0];

				config.titulo = 'Série'
				config.homeSelected = '';
				config.amigosSelected = '';
				config.seriesSelected = 'active';
				config.procuraVisible = 'hide';
				config.usuarioLogado = req.session.logado;

				res.render('cadastraSerie', config);
			}
		});		
	});
	app.get('/retornarseries', function(req, res) {
		var serie = require('./../model/serieModel'),
			pagina = Number(req.query.pagina) || 0,
			qtdRegistros = Number(req.query.qtdRegistros) || 0;

		serie.buscarListaSeries(pagina, qtdRegistros, function(rows, fields) {
			res.send('{"serie":' + JSON.stringify(rows) + '}');
		});
	});
	app.get('/erroserie', function(req, res) {
		config.homeSelected = '';
		config.amigosSelected = '';
		config.seriesSelected = '';
		config.procuraVisible = 'hide';
		config.usuarioLogado = req.session.logado;

		res.render('serieNaoEncontrada', config);
	});

	// controle de usuario
	app.get('/usuario/novo', function(req, res) {
		config.homeSelected = '';
		config.amigosSelected = '';
		config.seriesSelected = '';
		config.procuraVisible = 'hide';
		config.usuarioLogado = req.session.logado;

		res.render('cadastroUsuario', config);
	});
	app.put('/usuario/novo', function(req, res) {
		var user = require('./../model/userModel');

		user.nome = req.body.nome;
		user.email = req.body.email;
		user.login = req.body.login;
		user.senha = req.body.senha;

		user.salvarUsuario(function() {
			res.send(200);
		});
	});

	app.post('/login', function(req, res) {
		var sess = req.session,
			user = require('./../model/userModel'),
			html;

		user.validarUsuario(req.body.usuario, req.body.senha,  function(rows, fields) {
			if (rows.length > 0) {
				sess.user = req.body.usuario;
				sess.logado = true;

				html = '<form action="/logout" method="GET" id="frmLogin">'.concat(
							'<!--div class="form-group"><label>Bem-vindo, Usuario</label></div-->',
							'<input type="submit" class="btn btn-default" id="frmLoginSubmit" value="Log out" />',
						'</form>');
			} else {
				sess.user = '';
				sess.logado = false;
			}

			res.json({
				type: sess.logado,
				html: html
			});
		});
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