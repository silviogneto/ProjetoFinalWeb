var express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	path = require('path'),
	app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '/resources')));
app.use(session({secret: 'serie5S3cRe7'}));

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});

require('./router/main')(app);

app.listen(3000, function() {
	console.log('Iniciando servidor da aplicação');
});