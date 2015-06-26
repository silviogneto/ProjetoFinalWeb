function UserModel() {
	this.id = 0;
	this.nome = '';
	this.login = '';
	this.senha = '';

	this.validarUsuario = function(usuario, senha, callback) {
		var bd = require('./database'),
			query = 'SELECT Id FROM usuario WHERE Login = "' + usuario + '" and Senha = "' + senha + '"';

		callback = callback || function(){};
		
		bd.select(query, callback);
	};
};

module.exports = new UserModel();