var express = require('express');
var router = express.Router();
let find = require('../db/findDb');
let create = require('../db/createDb');
let update = require('../db/updateDb');
let hasher = require('./hasher');


router.get('/sign_in',function(req,res){
    res.render('user_dashboard/sign_in',{
        title: 'Uzengo -- Tableau de bord',

    })
})

router.post('/sign_in_user_dashboard', function(req, res, next) {
    req.checkBody('email', '- Mail invalide').isEmail();
    req.checkBody('password', '- Mot de passe invalide').notEmpty();
    req.checkBody('password', '- Mot de passe doit contenir au moins 6 caractères').isLength({
        min: 6
    });
    var errors = req.validationErrors();
    var unfound_user = null;
    if (errors) {
        res.render('user_dashboard/sign_in', {
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


                        if(privilege=='0'){
                            res.render('user_dashboard/user_dashboard',{title:'Uzengo - Service à la personne - Clients'})
                            session.isluxlogged = true;
                        }


                    }else{
                        unfound_user = [{
                            msg: 'Mot de passe incorrecte'
                        }];
                        res.render('user_dashboard/sign_in', {
                            title: 'Uzengo - Se connecter',
                            unfound_user: unfound_user,
                            errors:errors
                        });
                    }

                });
                unfound_user = [{
                    msg: 'l\'Utilisateur n\'existe pas'
                }];
                res.render('user_dashboard/sign_in', {
                    title: 'Uzengo - Se connecter',
                    unfound_user: unfound_user,
                    errors:errors
                });

            });


    }
});

router.get('/user_dashboard',function(req,res){
    let session = req.session;
    if(session.isinitialized){
        res.render('user_dashboard/user_dashboard',{title:'Uzengo - Service à la personne - Clients'});
    }
});




//exp.createOrderU = function(dateOfStart,duration,ouCouponId,ouId,ouStatus,ouStatusPayment,purchaseDate,price,mail, service){
router.post('/uzengo_user_order', function(req, res) {
    let session = req.session;
    if(session.isinitialized){
        let service = 'ménage';
        let mail = session.email;
        let date = session.date;
        let time = session.time;
        let duration = session.duration/3600;
        let price = duration*24.9;
        console.log("======="+service+'  '+mail+' '+date+' '+time+' '+duration+ ' '+ new Date());

        /*DATE - INTEGER - BIGINT - BIGINT- BOOLEAN - BOOLEAN - DATE - INTEGER - STRING - STRING*/
        let c = date;
        let day = c.slice(0,2);
        let mounth = c.slice(3,5);
        let year = c.slice(6,10);
        let d = mounth+'/'+day+'/'+year;
        let x =new Date(d+' '+time);
        x.setHours(x.getHours() - x.getTimezoneOffset() / 60);
        x = x.toISOString().slice(0, 19).replace('T', ' ');
        console.log("=========="+x);
        let y = new Date();
        y.setHours(y.getHours() - y.getTimezoneOffset() / 60);
        y = y.toISOString().slice(0, 19).replace('T', ' ');
        console.log("========="+y);

        //create.createOrderU('2017-03-19 11:42:35',0,0,0,true,true,'2017-03-19 11:42:35',10,mail,service);
        create.createOrderU(x,duration,0,0,true,true,y,price,mail,service);
        res.render('user_dashboard/payment_confirmation',{title:'Uzengo - Reserver votre service - step 1'});
    }else{
        let service = 'Ménage';
        let mail = session.email;
        let date = req.cookies.date;
        let time = req.cookies.time;
        let duration = req.cookies.duration/3600;
        let price = duration*24.9;
        console.log("======="+service+'  '+mail+' '+date+' '+time+' '+duration+ ''+ new Date());
        /*DATE - INTEGER - BIGINT - BIGINT- BOOLEAN - BOOLEAN - DATE - INTEGER - STRING - STRING*/
        let c = date;
        let day = c.slice(0,2);
        let mounth = c.slice(3,5);
        let year = c.slice(6,10);
        let d = mounth+'/'+day+'/'+year;

        let x =new Date(d+' '+time);
        x.setHours(x.getHours() - x.getTimezoneOffset() / 60);
        x = x.toISOString().slice(0, 19).replace('T', ' ');
        console.log("=========="+x);
        let y = new Date();
        y.setHours(y.getHours() - y.getTimezoneOffset() / 60);
        y = y.toISOString().slice(0, 19).replace('T', ' ');
        console.log("========="+y);
        //create.createOrderU('2017-03-19 11:42:35',0,0,0,true,true,'2017-03-19 11:42:35',10,mail,service);
        create.createOrderU(x,duration,0,0,true,true,y,price,mail,service);
        res.render('user_dashboard/payment_confirmation',{title:'Uzengo - Reserver votre service - step 1'});
    }

});


router.get('/user_dash_bookings',function(req,res) {
    let session = req.session;
    let list_item = [];

    find.findOrderUAllByMail(session.email).then(function (list) {
        list.forEach(function (x) {
            let service = x.get('service');
            let dateStart = x.get('dateOfStart');
            let duration = x.get('duration');
            let price = x.get('price');
            list_item.push([service, dateStart, duration, price]);
        });
        console.log(list_item);
        res.render('user_dashboard/user_dash_bookings', {
            title: 'Uzengo - Service à la personne - Contrats',
            list: list_item
        });

    });
});

router.get('/user_dash_invoices',function(req,res){let session = req.session;
    let list_item = [];

    find.findOrderUAllByMail(session.email).then(function (list) {
        list.forEach(function (x) {
            let service = x.get('service');
            let dateStart = x.get('dateOfStart');
            let duration = x.get('duration');
            let price = x.get('price');
            list_item.push([service, dateStart, duration, price]);
        });
        console.log(list_item);
        res.render('user_dashboard/user_dash_invoices', {
            title: 'Uzengo - Service à la personne - Factures',
            list: list_item
        });

    });
});

module.exports = router;
