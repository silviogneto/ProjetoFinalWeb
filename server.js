var express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	app = express();

app.set('views', __dirname.concat('/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('resources'));
app.use('/series', express.static('resources'));
app.use(session({secret: 'serie5S3cRe7'}));

require('./router/main')(app);

var server = app.listen(3000, function() {
	//var host = server.address().address,
	//	port = server.address().port;
	
	console.log('Iniciando servidor');
});