function UserModel() {
	this.id = 0;
	this.nome = '';
	this.email = '';
	this.login = '';
	this.senha = '';

	this.validarUsuario = function(usuario, senha, callback) {
		var bd = require('./database'),
			query = 'SELECT Id FROM usuario WHERE Login = "' + usuario + '" and Senha = "' + senha + '"';

		bd.select(query, callback);
	};

	this.salvarUsuario = function(callback) {
		var me = this,
			bd = require('./database'),
			query = 'INSERT INTO usuario (Nome, Email, Login, Senha) VALUES (?, ?, ?, ?)';

		bd.insert(query, [
			me.nome,
			me.email,
			me.login,
			me.senha
		], callback);
	};

	this.getAll = function(callback) {
		var bd = require('./database');

		bd.select('SELECT * FROM usuario', callback);
	};
};

module.exports = new UserModel();