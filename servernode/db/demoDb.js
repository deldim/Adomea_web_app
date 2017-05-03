let table = require('./DbDefine');
let find = require('./findDb');
let create = require('./createDb');
let hasher = require('../routes/hasher');

create.createAuth("client@uzengo.com","0",hasher.hash("client@uzengo.com","adomea"),"sha512");
create.createUser("address test","2090","Luxembourg","FR","uzengo firstName","uzengo name","client@uzengo.com","0644441111");
create.createLinkUserUzengo("client@uzengo.com");
create.createOrderU(new Date(2017,2,24),2,"","",true,true,new Date(2017,2,17),17.99,"client@uzengo.com","menage");


create.createAuth("lalux@uzengo.com","5",hasher.hash("lalux@uzengo.com","adomea"),"sha512");

create.createAuth("clientLalux@uzengo.com","0",hasher.hash("clientLalux@uzengo.com","adomea"),"sha512");
create.createUser("address test","2090","Luxembourg","FR","lalux firstName","lalux name","clientLalux@uzengo.com","0644441111");
create.createLinkUserLalux("clientLalux@uzengo.com");
create.createOrderU(new Date(2017,2,24),2,"","",true,true,new Date(2017,2,17),17.99,"clientLalux@uzengo.com","menage");
