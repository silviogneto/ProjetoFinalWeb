var config = {
	titulo: 'Projeto Series',
	homeSelected: '',
	seriesSelected: '',
	procuraVisible: '',
	idUsuarioLogado: 0,
	tipoListagemSerie: 0,
	usuarioLogado: false,
	serie: {},
	isAdmin: false
};

module.exports = function(app) {
	app.get(['/', '/index'], function(req, res) {
		config.homeSelected = 'active';
		config.seriesSelected = '';
		config.procuraVisible = 'hide';
		config.usuarioLogado = req.session.logado;

		res.render('index', config);
	});

	// parte das series
	app.get('/series', function(req, res) {
		config.titulo = 'Lista de Séries'
		config.homeSelected = '';
		config.seriesSelected = 'active';
		config.procuraVisible = '';
		config.tipoListagemSerie = 0;
		config.usuarioLogado = req.session.logado;

		res.render('listaSeries', config);
	});

	app.get('/series/vistas', function(req, res) {
		config.titulo = 'Lista das Séries já vistas'
		config.homeSelected = '';
		config.seriesSelected = 'active';
		config.procuraVisible = '';
		config.tipoListagemSerie = 1;
		config.usuarioLogado = req.session.logado;

		res.render('listaSeries', config);
	});

	app.get('/series/ver', function(req, res) {
		config.titulo = 'Lista das Séries que desejo ver'
		config.homeSelected = '';
		config.seriesSelected = 'active';
		config.procuraVisible = '';
		config.tipoListagemSerie = 2;
		config.usuarioLogado = req.session.logado;

		res.render('listaSeries', config);
	});

	app.get('/series/:serieId', function(req, res) {
		// the user was found and is available in req.user
		//res.send('Não implementado');
		//res.redirect('/erroserie');

		var serie = require('./../model/serieModel'),
			idSerie = Number(req.params.serieId) || 0;

		serie.buscarSerie(
			idSerie,
			config.idUsuarioLogado,
			function(rows, fields) {
				if (rows.length > 0)
				{
					config.serie = rows[0];

					config.titulo = 'Série'
					config.homeSelected = '';
					config.seriesSelected = 'active';
					config.procuraVisible = 'hide';
					config.usuarioLogado = req.session.logado;

					res.render('cadastraSerie', config);
				}
				else
				{
					res.redirect('/erroserie');
				}
			}
		);		
	});

	app.get('/retornarseries', function(req, res) {
		var serie = require('./../model/serieModel'),
			pagina = Number(req.query.pagina) || 0,
			qtdRegistros = Number(req.query.qtdRegistros) || 0,
			textoPesquisa = String(req.query.textoPesquisa);

		switch (config.tipoListagemSerie)
		{
			case 0:
				serie.buscarListaSeries(
					pagina, 
					qtdRegistros,
					textoPesquisa,
					function(rows, fields) {
						res.send('{"serie":' + JSON.stringify(rows) + '}');
					}
				);
				break;

			case 1:
				serie.buscarListaSeriesJaVistas(
					pagina,
					qtdRegistros,
					config.idUsuarioLogado,
					textoPesquisa,
					function(rows, fields) {
						res.send('{"serie":' + JSON.stringify(rows) + '}');
					}
				);
				break;

			case 2:
				serie.buscarListaSeriesDesejoVer(
					pagina,
					qtdRegistros,
					config.idUsuarioLogado,
					textoPesquisa,
					function(rows, fields) {
						res.send('{"serie":' + JSON.stringify(rows) + '}');
					}
				);
				break;
		}
	});

	app.get('/retornarultimasseries', function(req, res) {
		var serie = require('./../model/serieModel'),
			qtdRegistros = Number(req.query.qtdRegistros) || 0;

		serie.buscarListaUltimasSeries(
			qtdRegistros,
			function(rows, fields) {
				res.send('{"serie":' + JSON.stringify(rows) + '}');
			}
		);
	});

	app.post('/marcarseriejavista', function(req, res) {
		var serie = require('./../model/serieModel');
		
		serie.marcarSerieJaVista(
			config.serie.Id,
			config.idUsuarioLogado,
			function(rows, fields) {
				res.json({
					marcouSerie: rows.length > 0
				});
			}
		);		
	});

	app.post('/marcarseriedesejover', function(req, res) {
		var serie = require('./../model/serieModel');
		
		serie.marcarSerieDesejoVer(
			config.serie.Id,
			config.idUsuarioLogado,
			function(rows, fields) {
				res.json({
					marcouSerie: rows.length > 0
				});
			}
		);		
	});

	app.post('/removerseriejavista', function(req, res) {
		var serie = require('./../model/serieModel');
		
		serie.removerSerieJaVista(
			config.serie.Id,
			config.idUsuarioLogado,
			function(rows, fields) {
				res.json({
					removeuSerie: rows.length > 0
				});
			}
		);		
	});

	app.post('/removerseriedesejover', function(req, res) {
		var serie = require('./../model/serieModel');
		
		serie.removerSerieDesejoVer(
			config.serie.Id,
			config.idUsuarioLogado,
			function(rows, fields) {
				res.json({
					removeuSerie: rows.length > 0
				});
			}
		);
	});

	app.get('/erroserie', function(req, res) {
		config.homeSelected = '';
		config.seriesSelected = '';
		config.procuraVisible = 'hide';
		config.usuarioLogado = req.session.logado;

		res.render('serieNaoEncontrada', config);
	});

	// controle de usuario
	app.get('/usuario', function(req, res) {
		var user = require('./../model/userModel');

		user.getAll(function(rows, fields) {
			var ls = [];

			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];

				ls.push({ id: row.Id, nome: row.Nome, email: row.Email, login: row.Login });
			};

			config["usuarios"] = ls;

			res.render('listaUsuarios', config);
		});
	});

	app.get('/usuario/:usuarioId([0-9]+)', function(req, res) {
		var user = require('./../model/userModel');

		user.getById(req.params.usuarioId, function(rows, fields) {
			var row = rows[0];

			config['user'] = {
				id: row.Id || 0,
				nome: row.Nome || '',
				email: row.Email || '',
				login: row.Login || '',
				senha: row.Senha || ''
			};

			res.render('cadastroUsuario', config);
		});
	});

	app.put('/usuario/:usuarioId([0-9]+)', function(req, res) {
		var user = require('./../model/userModel');

		user.id = req.body.id;
		user.nome = req.body.nome;
		user.email = req.body.email;
		user.login = req.body.login;

		if (req.body.senha != '')  {
			user.senha = req.body.senha;	
		}

		user.salvarUsuario(function() {
			res.send(200);
		});
	});

	app.delete('/usuario/:usuarioId([0-9]+)', function(req, res) {
		var user = require('./../model/userModel');
		
		user.excluir(req.params.usuarioId, function() {
			res.send(200);
		});
	});

	app.get('/usuario/novo', function(req, res) {
		config.homeSelected = '';
		config.seriesSelected = '';
		config.procuraVisible = 'hide';
		config.usuarioLogado = req.session.logado;

		config['user'] = {
			id: 0,
			nome: '',
			email: '',
			login: '',
			senha: ''
		};

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
				var row = rows[0];

				sess.user = row.Login;
				sess.logado = true;
				sess.isAdmin = (new Buffer(row.IsAdmin, 'binary')[0] == 1);
				config.idUsuarioLogado = row.Id;

				config.isAdmin = sess.isAdmin;

				/*html = '<form action="/logout" method="GET" id="frmLogin">'.concat(
							'<!--div class="form-group"><label>Bem-vindo, Usuario</label></div-->',
							'<input type="submit" class="btn btn-default" id="frmLoginSubmit" value="Log out" />',
						'</form>');*/
			} else {
				sess.user = '';
				sess.logado = false;

				config.isAdmin = false;
				config.idUsuarioLogado = 0;
			}

			res.json({
				type: sess.logado,
				//html: html
			});
		});
	});

	app.get('/logout', function(req, res) {
		config.isAdmin = false;
		config.idUsuarioLogado = 0;

		req.session.destroy(function(err) {
			if (err) {
				console.log(err);
			} else {
				res.redirect('/');
			}
		});
	});
}