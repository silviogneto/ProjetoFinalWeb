var formidable = require('formidable'),
	fs = require('fs');

// retorna a configuração da pagina por sessao
function getConfigBySession(sess) {
	return {
		titulo: '',
		lastPage: sess.lastPage,
		idUsuarioLogado: sess.idUsuario,
		usuarioLogado: sess.logado || false,
		isAdmin: sess.isAdmin
	};
};

module.exports = function(app) {
	app.get(['/', '/index'], function(req, res) {
		var sess = req.session;
		sess.lastPage = 'home';

		res.render('index', getConfigBySession(sess));
	});

	// parte das series
	app.get('/series', function(req, res) {
		var sess = req.session;
		sess.lastPage = 'series';

		var config = getConfigBySession(sess);

		config.titulo = 'Lista de Séries';
		config['tipoListagemSerie'] = 0;

		res.render('listaSeries', config);
	});

	app.get('/series/vistas', function(req, res) {
		var sess = req.session;
		sess.lastPage = 'series';

		var config = getConfigBySession(sess);

		config.titulo = 'Lista das Séries já vistas';
		config['tipoListagemSerie'] = 1;

		res.render('listaSeries', config);
	});

	app.get('/series/ver', function(req, res) {
		var sess = req.session;
		sess.lastPage = 'series';

		var config = getConfigBySession(sess);

		config.titulo = 'Lista das Séries que desejo ver';
		config['tipoListagemSerie'] = 2;

		res.render('listaSeries', config);
	});

	app.get('/series/destaques', function(req, res) {
		var serie = require('./../model/serieModel'),
			qtdRegistros = Number(req.query.qtdRegistros) || 0;

		serie.buscarListaUltimasSeries(
			qtdRegistros,
			function(rows, fields) {
				res.json({
					serie: rows
				});
			}
		);
	});

	app.get('/series/:serieId', function(req, res) {
		var sess = req.session,
			serie = require('./../model/serieModel'),
			idSerie = Number(req.params.serieId) || 0,
			logado = sess.idUsuario || 0;

		sess.lastPage = 'series';

		serie.buscarSerie(
			idSerie,
			logado,
			function(rows, fields) {
				if (rows.length > 0)
				{
					var config = getConfigBySession(sess);

					config['serie'] = rows[0];
					config.titulo = 'Série';

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
						res.json({
							serie: rows
						});
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
						res.json({
							serie: rows
						});
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
						res.json({
							serie: rows
						});
					}
				);
				break;
		}
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
		var sess = req.session;
		sess.lastPage = '';

		res.render('serieNaoEncontrada', getConfigBySession(sess));
	});

	// controle de usuario
	app.get('/usuario', function(req, res) {
		var sess = req.session,
			user = require('./../model/userModel');

		sess.lastPage = 'usuario';

		if (sess.logado && sess.isAdmin) {
			user.getAll(function(rows, fields) {
				var ls = [],
					config = getConfigBySession(sess);

				for (var i = 0; i < rows.length; i++) {
					var row = rows[i];

					ls.push({ id: row.Id, nome: row.Nome, email: row.Email, login: row.Login });
				};

				config["usuarios"] = ls;

				res.render('listaUsuarios', config);
			});
		} else {
			res.sendStatus(403);
		}
	});

	app.get('/usuario/novo', function(req, res) {
		var sess = req.session;
		sess.lastPage = '';

		var config = getConfigBySession(sess);

		config['user'] = {
			id: 0,
			nome: '',
			email: '',
			login: '',
			senha: '',
			imagem: ''
		};

		res.render('cadastroUsuario', config);
	});

	app.put('/usuario/novo', function(req, res) {
		var form = new formidable.IncomingForm();

		form.parse(req, function(err, fields, files) {
			var image = files.image,
				image_upload_path_old = image.path,
				image_upload_path_new = __dirname + './../resources/img/usuario/',
				image_upload_name = image.name,
				image_upload_path_name = image_upload_path_new + image_upload_name;

			console.log(fields);

			var fnAdd = function() {
				fs.rename(image_upload_path_old, image_upload_path_name, function (err) {
					if (err) {
						console.log('Err: ', err);
					}

					var user = require('./../model/userModel');

					user.nome = fields.nome;
					user.email = fields.email;
					user.login = fields.login;
					user.senha = fields.senha;
					user.imagem = image_upload_name;

					user.salvarUsuario(function() {
						res.send(200);
					});
				});
			};

			if (image_upload_name == '') {
				fnAdd();
				return;
			}

			if (fs.existsSync(image_upload_path_new)) {
				fnAdd();
			} else {
				fs.mkdir(image_upload_path_new, function (err) {
					if (err) {
						console.log('Err: ', err);
						res.end('Deu merda na hora de criar o diretório!');
					}

					fnAdd();
				});
			}
		});
	});

	app.get('/usuario/:usuarioId', function(req, res) {
		var user = require('./../model/userModel'),
			sess = req.session;

		sess.lastPage = '';;

		if (sess.logado && (sess.isAdmin || sess.idUsuario == req.params.usuarioId)) {
			user.getById(req.params.usuarioId, function(rows, fields) {
				var row = rows[0],
					config = getConfigBySession(sess);

				config['user'] = {
					id: row.Id || 0,
					nome: row.Nome || '',
					email: row.Email || '',
					login: row.Login || '',
					senha: row.Senha || '',
					imagem: row.Imagem || ''
				};

				res.render('cadastroUsuario', config);
			});
		} else {
			res.sendStatus(403);
		}
	});

	app.put('/usuario/:usuarioId', function(req, res) {
		var form = new formidable.IncomingForm();

		form.parse(req, function(err, fields, files) {
			var image = files.image,
				image_upload_path_old = image.path,
				image_upload_path_new = __dirname + './../resources/img/usuario/',
				image_upload_name = image.name,
				image_upload_path_name = image_upload_path_new + image_upload_name;

			var fnAdd = function() {
				fs.rename(image_upload_path_old, image_upload_path_name, function (err) {
					if (err) {
						console.log('Err: ', err);
					}

					var user = require('./../model/userModel');

					user.id = fields.id;
					user.nome = fields.nome;
					user.email = fields.email;
					user.login = fields.login;
					user.imagem = image_upload_name;

					if (req.body.senha != '')  {
						user.senha = req.body.senha;	
					}

					user.salvarUsuario(function() {
						res.send(200);
					});
				});
			};

			if (image_upload_name == '') {
				fnAdd();
				return;
			}

			if (fs.existsSync(image_upload_path_new)) {
				fnAdd();
			} else {
				fs.mkdir(image_upload_path_new, function (err) {
					if (err) {
						console.log('Err: ', err);
						res.end('Deu merda na hora de criar o diretório!');
					}

					fnAdd();
				});
			}
		});
	});

	app.delete('/usuario/:usuarioId', function(req, res) {
		var user = require('./../model/userModel');
		
		user.excluir(req.params.usuarioId, function() {
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

				sess.idUsuario = row.Id;
				sess.user = row.Login;
				sess.logado = true;
				sess.isAdmin = (new Buffer(row.IsAdmin, 'binary')[0] == 1);
			} else {
				sess.idUsuario = 0;
				sess.user = '';
				sess.logado = false;
				sess.isAdmin = false;
			}

			res.json({
				type: sess.logado
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