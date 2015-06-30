var util = require('util');

function SerieModel() {
	this.id = 0;
	this.nome = '';
	this.descricao = '';
	this.imgPoster = '';
	this.ano;

	this.buscarSerie = function(idSerie, idUsuario, callback) {

		var query =	util.format(
			' SELECT ' +
				' s.Id, ' +
				' s.Nome, ' +
				' s.Descricao, ' +
				' s.ImgPoster, ' +
				' s.Ano, ' +
				' IF (sjv.Id IS NOT NULL, \'true\', \'false\') AS MarcadaJaVista, ' +
				' IF (sdv.Id IS NOT NULL, \'true\', \'false\') AS MarcadaDesejoVer ' +
			' FROM ' +
				' serie s ' +
				' LEFT JOIN serieJaVista sjv ON sjv.IdSerie = s.Id AND sjv.IdUsuario = %d ' +
				' LEFT JOIN serieDesejoVer sdv ON sdv.IdSerie = s.Id AND sdv.IdUsuario = %d ' +
			' WHERE ' +
				' s.Id = %d ',
			idUsuario,
			idUsuario,
			idSerie
		);
		
		this.executarConsulta(query, callback);
	}

	this.buscarListaSeries = function(pagina, qtdRegistros, callback) {

		var offset = pagina * qtdRegistros,
			limit = qtdRegistros;

		var	query = util.format(
			' SELECT ' +
				' Id, ' +
				' Nome, ' +
				' Descricao, ' +
				' ImgPoster, ' +
				' Ano ' +
			' FROM ' +
				' serie ' +
			' LIMIT %d,%d ',
			offset,
			limit
		);
		
		this.executarConsulta(query, callback);
	}

	this.buscarListaSeriesJaVistas = function(pagina, qtdRegistros, idUsuario, callback) {

		var offset = pagina * qtdRegistros,
			limit = qtdRegistros;
		
		var query = util.format(
			' SELECT ' +
				' s.Id, ' +
				' s.Nome, ' +
				' s.Descricao, ' +
				' s.ImgPoster, ' +
				' s.Ano ' +
			' FROM ' +
				' serieJaVista sjv ' +
				' INNER JOIN serie s ON s.Id = sjv.IdSerie ' +
			' WHERE ' +
				' sjv.IdUsuario = %d ' +
			' LIMIT %d,%d ',
			idUsuario,
			offset,
			limit
		);
		
		this.executarConsulta(query, callback);
	}

	this.buscarListaSeriesDesejoVer = function(pagina, qtdRegistros, idUsuario, callback) {

		var offset = pagina * qtdRegistros,
			limit = qtdRegistros;

		var query = util.format(
			' SELECT ' +
				' s.Id, ' +
				' s.Nome, ' +
				' s.Descricao, ' +
				' s.ImgPoster, ' +
				' s.Ano ' +
			' FROM ' +
				' serieDesejoVer sdv' +
				' INNER JOIN serie s ON s.Id = sdv.IdSerie ' +
			' WHERE ' +
				' sdv.IdUsuario = %d ' +
			' LIMIT %d,%d ',
			idUsuario,
			offset,
			limit
		);

		this.executarConsulta(query, callback);
	}

	this.marcarSerieJaVista = function(idSerie, idUsuario, callback)
	{
		var query = util.format(
			' SELECT ' +
				' id ' +
			' FROM ' +
				' serieJaVista ' +
			' WHERE ' +
				' IdUsuario = %d ' +
				' AND IdSerie = %d ',
			idUsuario,
			idSerie
		);

		var me = this;

		this.executarConsulta(query, function(rows, fields) {

			if (rows.length === 0)
			{
				me.removerSerieDesejoVer(idSerie, idUsuario);

				var query =
					' INSERT INTO serieJaVista ' +
					' ( ' +
						' IdUsuario, ' +
						' IdSerie '+
					' ) ' +
					' VALUES ' +
					' ( ' +
						' ?, ' +
						' ? ' +
					' ) ';

				var params = [idUsuario, idSerie];

				me.executarAlteracao(query, params, callback);
			}
		});
	}

	this.marcarSerieDesejoVer = function(idSerie, idUsuario, callback)
	{
		var query = util.format(
			' SELECT ' +
				' id ' +
			' FROM ' +
				' serieDesejoVer ' +
			' WHERE ' +
				' IdUsuario = %d ' +
				' AND IdSerie = %d ',
			idUsuario,
			idSerie
		);

		var me = this;

		this.executarConsulta(query, function(rows, fields) {

			if (rows.length === 0)
			{
				me.removerSerieJaVista(idSerie, idUsuario);

				var query =
					' INSERT INTO serieDesejoVer ' +
					' ( ' +
						' IdUsuario, ' +
						' IdSerie '+
					' ) ' +
					' VALUES ' +
					' ( ' +
						' ?, ' +
						' ? ' +
					' ) ';

				var params = [idUsuario, idSerie];

				me.executarAlteracao(query, params, callback);
			}
		});
	}

	this.removerSerieJaVista = function(idSerie, idUsuario, callback)
	{
		var query =
			' DELETE FROM serieJaVista ' +
			' WHERE ' +
				' IdUsuario = ? ' +
				' AND IdSerie = ? ';

		var params = [idUsuario, idSerie];

		this.executarAlteracao(query, params, callback);
	}

	this.removerSerieDesejoVer = function(idSerie, idUsuario, callback)
	{
		var query =
			' DELETE FROM serieDesejoVer ' +
			' WHERE ' +
				' IdUsuario = ? ' +
				' AND IdSerie = ? ';

		var params = [idUsuario, idSerie];
		
		this.executarAlteracao(query, params, callback);
	}

	this.executarConsulta = function(query, callback)
	{
		var bd = require('./database');
		
		callback = callback || function(){};
		
		bd.select(query, callback);
	}

	this.executarAlteracao = function(query, params, callback)
	{
		var bd = require('./database');
		
		callback = callback || function(){};
		
		bd.insert(query, params, callback);
	}

};

module.exports = new SerieModel();