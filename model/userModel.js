function UserModel() {
	this.id = 0;
	this.nome = '';
	this.email = '';
	this.login = '';
	this.senha = '';
	this.isAdmin = false;

	this.validarUsuario = function(usuario, senha, callback) {
		var bd = require('./database'),
			query = 'SELECT * FROM usuario WHERE Login = "' + usuario + '" and Senha = "' + senha + '"';

		bd.select(query, callback);
	};

	this.salvarUsuario = function(callback) {
		var me = this,
			bd = require('./database'),
			query;

		if (me.id > 0) {
			query = 'UPDATE usuario SET Nome = ?, Email = ?, Login = ?',
			params = [ me.nome, me.email, me.login ]

			if (me.senha != '') {
				query = query.concat(', Senha = ?');
				params.push(me.senha);
			}

			query = query.concat('WHERE Id = ?');
			params.push(me.id);

			bd.update(query, params, callback);
		} else {
			query = 'INSERT INTO usuario (Nome, Email, Login, Senha) VALUES (?, ?, ?, ?)';

			bd.insert(query, [
				me.nome,
				me.email,
				me.login,
				me.senha
			], callback);	
		}
	};

	this.excluir = function(id, callback) {
		var bd = require('./database'),
			query = 'DELETE FROM usuario WHERE Id = ?';

		bd.delete(query, [id], callback);
	};

	this.getAll = function(callback) {
		var bd = require('./database');

		bd.select('SELECT * FROM usuario', callback);
	};

	this.getById = function(id, callback) {
		var bd = require('./database'),
			query = 'SELECT * FROM usuario WHERE Id = '.concat(id);

		bd.select(query, callback);
	};
};

module.exports = new UserModel();