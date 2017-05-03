var express = require('express');
var router = express.Router();
let find = require('../db/findDb');
let create = require('../db/createDb');
let update = require('../db/updateDb');
let hasher = require('./hasher');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index',{title:'Uzengo - Prestation de service à domicile'.success,errors:req.session.errors});
    req.session.errors = null;
});

router.post('/bids', function(req, res, next) {

    res.cookie('postcode', req.body.postcode);
    //Check validity
    req.checkBody('postcode', 'code postale invalide').notEmpty().isInt().isLength({
        min: 0,
        max: 4
    });
    var errors = req.validationErrors();
    if (errors) {
        res.render('index', {
            errors: errors
        });
        return;
    } else {
        var postcode = req.body.postcode;
        if (postcode == "2090") {
            res.render('bids_process/service_selection', {
                title: 'Uzengo - Reserver votre service - step 1',
                postcode: postcode
            });
        } else {
            res.render('unavailable/unavailable_service', {
                title: 'Uzengo - Reserver votre service - step 1'
            });
        }
    }

});


router.get('/admin_dashboard',function(req,res){
    res.render('admin_dashboard')
});

router.get('/log_out',function(req,res){
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.render('index',{title:'Uzengo - Prestation de service à domicile'});
        }
    });
});

router.get('*', function(req, res) {
    res.render('page_404', {
        title: 'Erreur 404'
    });
});


module.exports = router;
