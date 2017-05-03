let find = require('../db/findDb');
let create = require('../db/createDb');
let update = require('../db/updateDb');
let hasher = require('./hasher');

/*let c = '26/04/2017';
let day = c.slice(0,2);
let mounth = c.slice(3,5);
let year = c.slice(6,10);

let date = mounth+'/'+day+'/'+year;

let x =new Date(date);
x.setHours(x.getHours() - x.getTimezoneOffset() / 60);
x = x.toISOString().slice(0, 19).replace('T', ' ');
console.log(x + "========"+mounth+'/'+day+'/'+year);

let y = new Date();
y.setHours(y.getHours() - y.getTimezoneOffset() / 60);
y = y.toISOString().slice(0, 19).replace('T', ' ');
console.log(y);*/

//let code =hasher.hash('lalux@uzengo.com','password');
//console.log(code);

create.createAuth('deld@live.fr','5',hasher.hash('pppppp'),'sasa');
