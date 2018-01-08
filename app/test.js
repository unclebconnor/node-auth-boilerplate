var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('passport');
var axios = require('axios');

router.get('/narf',function(req,res){
	console.log('totes narf');
	res.send('fweep');
})

module.exports = router;






















// THIs IS THE END MY FRIEND