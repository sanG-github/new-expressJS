var db = require('../db')
const shortid = require('shortid')

module.exports.index = function(req, res){
	res.render('users/index', {
		users: db.get('users').value()
	});
}

module.exports.create = function(req, res){
	res.render('users/create')
}

module.exports.search = function(req, res) {
	var q = req.query.q;
	var users = db.get('users').value();
	var hashSearch = users.filter(function(user) {
		return user.name.toLowerCase().indexOf(q) !== -1;
	});

	res.render('users', {
		users: hashSearch
	});
}

module.exports.viewUser = function(req, res){
	var id = req.params.id;
	if(db.get('users').find({id: id}).value()){
			res.render('users/view', {
			user: db.get('users').find({id: id}).value()
		});
	}
	else res.redirect('/users')
}

module.exports.postCreate = function(req, res, next){
	var errors = [];
	req.body.id  = shortid.generate();

	if(!req.body.name){
		errors.push("Username is required.")
	}
	else if(db.get('users').find({name: req.body.name}).value()){
		errors.push("Username already")
	}

	if(!req.body.password){
		errors.push("Password is required.")
	}

	if(errors.length)
		res.render('users/create', {
			errors: errors,
			value: req.body
		});
	else{
		db.get('users').push(req.body).write();
		res.redirect('/users')
	}
}