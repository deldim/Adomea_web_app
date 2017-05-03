var express = require('express');
var router = express.Router();
let find = require('../db/findDb');
let create = require('../db/createDb');
let update = require('../db/updateDb');
let hasher = require('./hasher');


router.get('/service_selection', function(req, res) {
    res.render('bids_process/service_selection', {
        title: 'Uzengo - Choisir un service'
    });
});



router.post('/uzengo_user_order', function(req, res) {
        res.render('bids_process/payment_confirmation', {
            title: 'Uzengo - Paiement accepté'
        });
});


router.post('/paiment', function(req, res, next) {
    //Convert duration
    var hours = parseInt(req.cookies.duration) / 3600,duration;
    var hourFraction = (hours % 1),
        mins = hourFraction > 0 ? Math.floor(60 * hourFraction) : '';
    duration = Math.floor(hours) + 'h' + mins;
    var price_per_hour = 24.90;
    var bid_cost_summary = hours * price_per_hour;
    var real_price = bid_cost_summary - (bid_cost_summary * 0.3);
    real_price = real_price.toFixed(2);
    bid_cost_summary = bid_cost_summary.toFixed(2);

    //Check validity

    req.checkBody('firstname', 'Nom invalide').isAlpha('fr-FR');
    req.checkBody('firstname', 'Nom trop court').isLength({
        min: 3
    });
    req.checkBody('lastname', 'Prénom invalide').isAlpha('fr-FR');
    req.checkBody('lastname', 'Prénom trop court').isLength({
        min: 3
    });
    req.checkBody('email', 'mail invalide').isEmail();
    req.checkBody('address1', 'adresse invalide').notEmpty();
    req.checkBody('address1', 'adresse trop courte').isLength({
        min: 5
    });
    req.checkBody('town', 'code postale invalide').notEmpty();
    req.checkBody('password_confirmation', 'Le mot de passe et la confirmation ne sont pas identiques').notEmpty().equals(req.body.password);
    req.checkBody('password', 'mot de passe invalide').notEmpty();
    req.checkBody('password', 'mot de passe doit contenir au moins 6 caractères').isLength({
        min: 6
    });


    var errors = req.validationErrors();
    var duplicated_user = null;
    let session = req.session;
    session.email = req.body.email;
    //console.log(errors);
    //res.send('ok');

    if (errors) {
        res.render('bids_process/register', {
            title: 'Uzengo - Reserver votre service - step 2',
            postcode: req.cookies.postcode,
            date: req.cookies.date,
            time: req.cookies.time,
            duration: duration,
            bid_cost_summary: bid_cost_summary,
            bid_cost_total: bid_cost_summary,
            real_price: real_price,
            errors: errors
        });
        return;
    } else {

        create.createUser(req.body.address1 + ' ' + req.body.address2, req.cookies.postcode, req.body.town, 'fr', req.body.firstname, req.body.lastname, req.body.email, req.body.mobile);
        create.createAuth(req.body.email, '0', hasher.hash(req.body.email, req.body.password), 'sha512');
        res.render('bids_process/paiment', {
            title: 'Uzengo - Reserver votre service - step 3',
            postcode: req.cookies.postcode,
            date: req.cookies.date,
            time: req.cookies.time,
            duration: duration,
            bid_cost_summary: bid_cost_summary,
            bid_cost_total: bid_cost_summary,
            real_price: real_price
        });
        return;

    }

});


router.post('/selection_', function(req, res, next) {
    let service = req.body.service;
    //console.log(req.body.service);
    switch(service) {
        case 'ironning':
            res.render('bids_process/ironning', {
                title: 'Uzengo - Repassage'
            });
            break;
        case 'baby_sitting':
            res.render('bids_process/baby_sitting', {
                title: 'Uzengo - Garde d\'enfant'
            });
            break;
        default :
            res.render('bids_process/cleaning', {
                title: 'Uzengo - Ménage'
            });

    }
});


router.post('/selection', function(req, res, next) {
    //console.log(req.body.postcode);
    console.log('zzzzzzz');
    let session = req.session;
    res.cookie('service', req.body.service);
    res.cookie('duration', req.body.duration);
    res.cookie('date', req.body.date);
    res.cookie('time', req.body.time);
    var hours = parseInt(req.body.duration) / 3600,duration;
    var hourFraction = (hours % 1),
        mins = hourFraction > 0 ? Math.floor(60 * hourFraction) : '';
    duration = Math.floor(hours) + 'h' + mins;
    var price_per_hour = 24.90;
    var bid_cost_summary = hours * price_per_hour;
    var real_price = bid_cost_summary - (bid_cost_summary * 0.3);
    real_price = real_price.toFixed(2);
    bid_cost_summary = bid_cost_summary.toFixed(2);

    if(session.isinitialized){
        session.date = req.body.date;
        session.time = req.body.time;
        session.duration = req.body.duration;
        res.render('bids_process/paiment', {
            title: 'Uzengo - Reserver votre service - step 3',
            postcode: req.cookies.postcode,
            date: req.body.date,
            time: req.body.time,
            duration: duration,
            bid_cost_summary: bid_cost_summary,
            bid_cost_total: bid_cost_summary,
            real_price: real_price
        });
    }else{
        res.render('bids_process/register', {
            title: 'Uzengo - Reserver votre service - step 2',
            postcode: req.cookies.postcode,
            date: req.body.date,
            time: req.body.time,
            duration: duration,
            bid_cost_summary: bid_cost_summary,
            bid_cost_total: bid_cost_summary,
            real_price: real_price

        });
    }
});


router.get('/date_time', function(req, res) {
    let session = req.session;
    res.render('bids_process/date_time', {
        title: 'Uzengo - Reserver votre service - step 1',
        postcode: req.cookies.postcode,
        initialized :session.isinitialized
    });
});



module.exports = router;
