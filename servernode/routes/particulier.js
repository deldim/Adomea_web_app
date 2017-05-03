var express = require('express');
var router = express.Router();
let find = require('../db/findDb');
let create = require('../db/createDb');
let update = require('../db/updateDb');
let hasher = require('./hasher');

router.get('/',function(req,res){
    res.render('particulier/particulier',{title:'Uzengo - Service à la personne - Particulier'});

});

module.exports = router;
