var express = require('express');
var router = express.Router();

/* GET home page. */
router.route('/')

	.post(function( req, res ) {
		res.header("Access-Control-Allow-Origin", "*");
  		res.header("Access-Control-Allow-Headers", "X-Requested-With");

  		res.render('index', { title: 'Express' });

  		
	})

	.get(function( req, res ){
		res.header("Access-Control-Allow-Origin", "*");
  		res.header("Access-Control-Allow-Headers", "X-Requested-With");

		res.render('index', { title: 'Express' });
		
	});

module.exports = router;
