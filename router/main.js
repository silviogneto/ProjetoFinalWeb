module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index', {titulo: 'Projeto Series'});
	});

	app.get('/series', function(req, res) {
		res.render('listaSeries.html');
	});
}