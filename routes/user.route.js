var express = require('express')
var controller = require('../controllers/user.controllers')

var router = express.Router()

router.get('/', controller.index);

router.get('/create', controller.create);

router.get('/search', controller.search);

router.get('/view/:id', controller.viewUser);

router.post('/create', controller.postCreate);

module.exports = router;