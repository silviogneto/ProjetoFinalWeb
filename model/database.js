function DBSeries() {
	this.mysql = require('mysql');
	this.pool = this.mysql.createPool({
		connectionLimit: 100,
		host: 'localhost',
		user: 'root',
		password: '1234',
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

	this.nullHandler = function(){};
};

module.exports = new DBSeries();