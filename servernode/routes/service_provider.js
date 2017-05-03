var express = require('express');
var router = express.Router();
let find = require('../db/findDb');
let create = require('../db/createDb');
let update = require('../db/updateDb');
let hasher = require('./hasher');

router.get('/',function(req,res){
    res.render('service_provider/service_provider',{title:'Uzengo - Prestataire de service'});

});

module.exports = router;
