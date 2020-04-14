var express = require('express')
var db = require('../db')

var router = express.Router()

router.get('/login', function (req, res) {
	res.render('auth/login')
});

router.post('/login', function (req, res) {
	var email = req.body.name;
	var password = req.body.password;
	var errors = [];

	var user = db.get('users').find({name: email}).value();
	if(!user)
		errors.push('User not found');
	else{
		if(password === "")
			errors.push('Password empty');
		else if(user.password !== password)
			errors.push('Password does not match');
	}

	if(errors.length)
		res.render('auth/login',{
			errors: errors,
			value: req.body
		});
	else
		res.redirect('/users');
});

module.exports = router;