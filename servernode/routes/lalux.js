var express = require('express');
var router = express.Router();
let find = require('../db/findDb');
let create = require('../db/createDb');
let update = require('../db/updateDb');
let hasher = require('./hasher');



router.get('/',function(req,res){

    res.render('lalux/sign_in',{title:'Lalux - Service à la personne - Clients'})
});


router.post('/sign_in_lalux', function(req, res, next) {
    req.checkBody('email', '- Mail invalide').isEmail();
    req.checkBody('password', '- Mot de passe invalide').notEmpty();
    req.checkBody('password', '- Mot de passe doit contenir au moins 6 caractères').isLength({
        min: 6
    });
    var errors = req.validationErrors();
    var unfound_user = null;
    if (errors) {
        res.render('lalux/sign_in', {
            title: 'Uzengo - Se connecter',
            errors: errors
        });
    } else {
        var email = req.body.email;
        var password = req.body.password;
        let code = hasher.hash(email, password);
        // for the privilege variable '0':= client '1' = employee '2" := employer client '4':= admin '5':=lalux
        find.findAuthByMail(req.body.email).then(
            function (resultat) {
                resultat.forEach(function (auth) {
                    let hash_code = auth.get('hash');
                    let privilege = auth.get('privilege');
                    if(hash_code==code){
                        var session = req.session;
                        session.email = req.body.email;
                        session.isinitialized = true;


                        if(privilege=='5'){
                            res.render('lalux/lalux',{title:'Lalux - Service à la personne - Clients'})
                            session.isluxlogged = true;
                        }


                    }else{
                        unfound_user = [{
                            msg: 'Mot de passe incorrecte'
                        }];
                        res.render('lalux/sign_in', {
                            title: 'Uzengo - Se connecter',
                            unfound_user: unfound_user,
                            errors:errors
                        });
                    }

                });
                unfound_user = [{
                    msg: 'l\'Utilisateur n\'existe pas'
                }];
                res.render('lalux/sign_in', {
                    title: 'Uzengo - Se connecter',
                    unfound_user: unfound_user,
                    errors:errors
                });

            });


    }
});


router.get('/lalux_clients',function(req,res){
    //get lalux contrats via db call
    // we use table to simulate
    //exp.createCoupon = function(dateOfValidity, discount, duration, hash, idCoupon,mail, idOrderBusiness, status, numberOfUse){
    let session = req.session;
    if(session.isluxlogged){
        let list = [];
        find.findUserLaLuxAll().then(
            //TODO Get Coupon for LaLux user
            /*function(resultat){
             console.log('========== test 1');

             find.findCouponLastWithListUser(resultat).then(function (last_coupon) {
             resultat.forEach(function(x){

             let firstName =x.get('firstName');
             let lastName =x.get('lastName');
             let mail = x.get('mail');
             let address=x.get('address');
             let postalcode=x.get('postalcode');
             let town=x.get('town');
             let phoneNumber=x.get('phoneNumber:');
             let beginnig_date = null;
             console.log('========== test 2');

             last_coupon.forEach(function(coupon){
             console.log('========== test 3'+coupon.get('mail'));
             if(coupon.get('mail') == resultat.get('mail')){
             beginnig_date = coupon.get('dateOfValidity');

             }
             });

             list.push([firstName,lastName,mail,address+' '+'L-'+postalcode+' '+town,beginnig_date]);
             });
             res.render('lalux/lalux_clients',{title:'Lalux - Service à la personne - Contrats',list:list})

             });

             });*/
            function(resultat){
                resultat.forEach(function(x){
                    let firstName =x.get('firstName');
                    let lastName =x.get('lastName');
                    let mail = x.get('mail');
                    let address=x.get('address');
                    let postalcode=x.get('postalcode');
                    let town=x.get('town');
                    let phoneNumber=x.get('phoneNumber:');
                    console.log('========== test 2');
                    list.push([firstName,lastName,address+' '+'L-'+postalcode+' '+town,mail]);

                });
                res.render('lalux/lalux_clients',{title:'Lalux - Service à la personne - Contrats',list:list})


            });

    }

});

router.get('/lalux_contrats',function(req,res){
    //get lalux contrats via db call
    // we use table to simulate
    //exp.createCoupon = function(dateOfValidity, discount, duration, hash, idCoupon,mail, idOrderBusiness, status, numberOfUse){

    let list = [];
    find.findCouponByMail('').then(
        function(resultat){
            let coupon = resultat.forEach(function(x){
                let hash =x.get('hash');
                let validity_date =x.get('dateOfValidity');
                let discount =x.get('discount');
                let duration = x.get('duration');
                list.push([hash,validity_date,discount,duration]);
            });
            res.render('lalux/lalux_contrats',{title:'Lalux - Service à la personne - Contrats',list:list})

        });

});



router.get('/lalux',function(req,res){
    let session = req.session;
    if(session.isluxlogged){
        res.render('lalux/lalux',{title:'Lalux - Service à la personne - lalux'})
    }
});
router.post('/lalux_new_contrat', function(req, res, next) {
    let contract_type = req.body.contract_type;
    let discount = req.body.discount;
    let duration = req.body.duration;
    let validity_date = req.body.validity_date;
    let code_number = req.body.code_number;
    res.cookie('contract_type',contract_type);
    res.cookie('discount',discount);
    res.cookie('duration',duration);
    res.cookie('validity_date',validity_date);
    res.cookie('code_number',code_number);

    res.redirect('/lalux_new_contrat_payment');
});

router.post('/lalux_new_contrat_payment', function(req, res, next) {
    //createCoupon = function(dateOfValidity, discount, duration, hash, idCoupon,mail, idOrderBusiness, status, numberOfUse)
    let contract_type = req.cookies.contract_type;
    let discount = req.cookies.discount;
    let duration = req.cookies.duration;
    let validity_date = req.cookies.validity_date;
    let code_number = req.cookies.code_number;
    create.createCoupon(hasher.generate_date(validity_date),discount,duration,hasher.generate_word(),'','','lalux','accepted',code_number);
    res.redirect('/lalux');
});

router.get('/lalux_new_contrat',function(req,res){
    if(session.isluxlogged){
        res.render('lalux/lalux_new_contrat',{title:'Lalux - Service à la personne - Nouveau Contrats - Paiement'})
    }

});
router.get('/lalux_new_contrat_payment',function(req,res){
    let session = req.session;
    if(session.isluxlogged){
        res.render('lalux/lalux_new_contrat_payment',{title:'Lalux - Service à la personne - Nouveau Contrats - Paiement'})

    }
});

module.exports = router;
