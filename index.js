const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
var userRoute = require('./routes/user.route.js')
var authRoute = require('./routes/auth.route.js')
var bodyParser = require('body-parser')
var PORT = 3000;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function(req, res) {
	res.render('index', {
		name: "Home"
	});
});

app.use('/users', userRoute);
app.use('/auth', authRoute);
app.listen(PORT, function(){
	console.log("Listening on port " + PORT)
});