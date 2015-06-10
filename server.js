var express = require('express'),
	app = express();

require('./router/main')(app);

app.set('views', __dirname.concat('/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

/*app.get('/', function(req, res) {
	res.send('Hello world');
});*/

var server = app.listen(3000, function() {
	var host = server.address().address,
		port = server.address().port;
	
	//console.log('listen http://%s:%s', host, port);
});