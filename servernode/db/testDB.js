let table = require('./DbDefine');
let find = require('./findDb');
let create = require('./createDb');


//find.findByMail(table.authentication,'lossonalexis.gmail.com');
/*
 let dbDefine = require('./DbDefineClass.js');
 let DbDefine = new dbDefine();
 DbDefine.isDebug();
 DbDefine.createAuth('lossonalexis@gmail.com','0123456789','0123456789','CBC-512');
 DbDefine.findAuthByMail('lossonalexis@gmail.com');
 */

//DbDefine.isDebug();

//create.createAuth('lossonalexis@gmail.com','0123456789','0123456789','CBC-512');

/*
 find.findUserAll().then(
 function response(users){
 find.findLinkUserLaLuxAll().then(
 function response1(links){
 links.forEach(function(link) {
 users.forEach(function(user){
 if(user.get('mail') == link.get('mail')){
 //TODO: Do something
 }
 });
 });
 });
 });
 */

//create.createOrderU("2017-03-19 21:00:00",20,"12345678","1324567","1","2017-03-19 18:00:00",19,"alexis.losson@telecomnancy.net","test0");
/*
 find.findOrderU("alexis.losson@telecomnancy.net").then(function(orders){
 orders.forEach(function (order) {
 console.log(order);
 })
 });*/

/*find.findOrderUAllByMail("alexis.losson@telecomnancy.net").then(function(list){
 console.log(list);
 })*/

find.findUserLaLuxAll().then(function (list) {
    console.log(list);
})