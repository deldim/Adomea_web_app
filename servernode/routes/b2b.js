var express = require('express');
var router = express.Router();
let find = require('../db/findDb');
let create = require('../db/createDb');
let update = require('../db/updateDb');
let hasher = require('./hasher');/**
 * Created by deldim on 30/03/2017.
 */

router.get('/', function(req, res, next) {
    res.render('b2b/b2b',{title:'Uzengo - Business to Business'});
    //res.send("caca");
});
router.get('/easy_card', function(req, res, next) {
    res.render('b2b/easy_card',{title:'Uzengo - EasyCard'});
    //res.send("caca");
});
router.get('/uzengo_pro', function(req, res, next) {
    res.render('b2b/uzengo_pro',{title:'Uzengo - Uzengo PRO'});
    //res.send("caca");
});

module.exports = router;
