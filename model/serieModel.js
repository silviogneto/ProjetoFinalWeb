function SerieModel() {
	this.id = 0;
	this.nome = '';
	this.descricao = '';
	this.imgPoster = '';
	this.ano;

	this.buscarSeries = function(pagina, qtdRegistros, callback) {

		var offset = pagina * qtdRegistros,
			limit = qtdRegistros;

		var bd = require('./database'),
			query = 'SELECT Id, Nome, Descricao, ImgPoster, Ano FROM serie LIMIT ' + offset + ',' + limit;
		
		callback = callback || function(){};
		
		bd.select(query, callback);
	}
};

module.exports = new SerieModel();