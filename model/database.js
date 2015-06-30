function DBSeries() {
	this.mysql = require('mysql');
	this.pool = this.mysql.createPool({
		connectionLimit: 100,
		host: 'localhost',
		user: 'root',
		password: 'admin',
		database: 'bd_series'
	});

	this.select = function(sqlQuery, callback) {
		callback = callback || this.nullHandler;

		this.pool.getConnection(function(err, connection) {
			if (err) {
				connection.release();
				throw err;
			}

			connection.query(sqlQuery, function(err, rows, fields) {
				connection.release();

				if (err) {
					throw err;
				} else {
					callback(rows, fields);
				}
			});
		});
	};

	this.insert = function(sqlQuery, params, callback) {
		this.updateInsert(sqlQuery, params, callback);
	}

	this.update = function(sqlQuery, params, callback) {
		this.updateInsert(sqlQuery, params, callback);
	}

	this.delete = function(sqlQuery, params, callback) {
		this.updateInsert(sqlQuery, params, callback);	
	}
	
	this.updateInsert = function(sqlQuery, params, callback) {
		callback = callback || this.nullHandler;

		this.pool.getConnection(function(err, connection) {
			if (err) {
				connection.release();
				throw err;
			}
			
			connection.query(sqlQuery, params, function(err, result) {
				connection.release();

				if (err) {
					throw err;
				} else {
					callback(result);
				}
			});
		});
	}

	this.nullHandler = function(){};
};

module.exports = new DBSeries();