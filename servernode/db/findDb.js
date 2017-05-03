/**
 * Created by alexis on 22/02/17.
 */
let table = require('./DbDefine');

/*--- Variable ---*/
let exp = module.exports = {};
let Debug = true;

/*--- Management ---*/
function log(result) {
    if (Debug) {
        result.forEach(function (instance) {
                console.log(instance.get());
            }
        )
    }
    return result;
}


/*--- findByMail ---*/
function findByMail(table,mail) {
    return table.findAll({
            where:{
                mail: mail
            },
            order: '"createdAt" DESC',
        }
    )
};

/*--- Authentication ---*/
exp.findAuthByMail= function(mail){
    return findByMail(table.authentication,mail);
}

exp.get = function (res, key) {

    return res.forEach(function(inst){
        console.log(inst.get(key.toString()));
        return inst.get(key.toString());
        if(Debug) console.log(inst.get(key.toString()));
        return inst.get(key);
    })
}

/*---BusinessContractor ---*/
exp.findBusinessContractorByMail = function(mail){
    return findByMail(table.businessContractor,mail)
}

/*--- Coupon ---*/
exp.findCouponByMail= function(mail){
    return findByMail(table.coupon,mail)
}

exp.findCouponByIdOrderBusiness = function (idOrderB) {
    return table.coupon.findAll({
        where:{
            idOrderBusiness:idOrderB
        }
    }).then(log)
}

exp.findCouponByIdCoupon = function (idCoupon) {
    return table.coupon.findAll({
        where:{
            idCoupon: idCoupon
        }
    }).then(log)
}

exp.findCouponLastWithListUser = function (list) {
    return new Promise(function (resolve, reject) {
        table.coupon.findAll().then(function (coupons) {
            let lastCoupon = new Array;
            list.forEach(function (user) {
                let userList = new Array;
                coupons.forEach(function (coupon) {
                    if(coupon.get('mail') == user.get('mail')) userList.push(coupon);
                })
                lastCoupon.push(userList[userList.length - 1]);
            })
            resolve(lastCoupon);
        },function(){
            reject(arguments);
        })
    })
}

/*--- Icon ---*/
exp.findIconByMail= function(mail){
    return findByMail(table.icon,mail)
}

/*--- OrderB ---*/
exp.findOrderBByMail = function (mail) {
    return findByMail(table.orderB,mail)
}

exp.findOrderBById = function (obId) {
    return table.orderB.findAll({
        where:{
            obId: obId
        }
    }).then(log)
}

/*--- OrderU ---*/
exp.findOrderUByMail = function(mail){
    return findByMail(table.orderU,mail)
}

exp.findOrderUAllByMail = function(mail){
    return new Promise(function(resolve,reject){
        findByMail(table.orderU,mail).then(function (orders) {
            let list = new Array;
            orders.forEach(function (order) {
                list.push(order);
            });
            resolve(list);
        },function(){
            reject(arguments);
        })


    })
}

exp.findOrderUByOrderId = function(ouId){
    return table.orderU.findAll({
        where:{
            ouId:ouId
        }
    }).then(log)
}

/*--- User ---*/
exp.findUserByMail = function (mail) {
    return findByMail(table.user,mail)
}

exp.findUserAll = function (){
    return table.user.findAll();
}

exp.findUserUzengoAll = function () {
    return new Promise(function(resolve, reject){
        table.linkUserUzengo.findAll().then(function (links) {
            table.user.findAll().then(function(users){
                let list = new Array;

                links.forEach(function (link) {
                    users.forEach(function (user) {
                        if(link.get('mail') == user.get('mail')){
                            list.push(user);
                        }
                    })
                });

                resolve(list);
            },function () {
                reject(arguments);
            })
        },function () {
            reject(arguments);
        })
    })
};

exp.findUserLaLuxAll = function () {
    return new Promise(function(resolve, reject){
        table.linkUserLalux.findAll().then(function (links) {
            table.user.findAll().then(function(users){
                let list = new Array;

                links.forEach(function (link) {
                    users.forEach(function (user) {
                        if(link.get('mail') == user.get('mail')){
                            list.push(user);
                        }
                    })
                });

                resolve(list);
            },function () {
                reject(arguments);
            })
        },function () {
            reject(arguments);
        })
    })
};

/*--- LinkUserLalux ---*/
exp.findLinkUserLaLuxAll = function () {
    return table.linkUserLalux.findAll();
}

/*--- LinkUserUzengo ---*/
exp.findLinkUserUzengoAll = function () {
    return table.linkUserUzengo.findAll();
}

/*--- Worker ---*/
exp.findWorkerByMail = function (mail) {
    return findByMail(table.worker,mail)
}

/*--- WorkerCompany ---*/
exp.findWorkerCompanyByMail = function (mail) {
    return findByMail(table.workerCompany,mail)
}

/*--- Events ---*/
exp.findEventsByWorker = function (mail) {
    return table.event.findAll(
        {
            where:{
                mailWorker:mail
            }

        }
    ).then(log)
}

exp.findEventsByCreator = function(mail){
    return table.event.findAll(
        {where:
        {
            mailCreator:mail
        }}
    ).then(log)
}

function unavailableWorkerSort(eventProgrammedAtTheSameTime){
    let workerUnavailable = new Array();
    eventProgrammedAtTheSameTime.forEach(function(rst) {
            workerUnavailable.push(rst.get('mail'))
        }
    )

    return workerUnavailable;
}

function isUnavailable(workerUnavailable, mailWorker){
    let bool = false;
    workerUnavailable.forEach(function (rst) {
            if (rst.get('mail') == mailWorker) {
                bool = true;
            }
        }
    )
    return bool;
}

exp.workerAvailable = function(timeStart, duration, activity){
    let workerAvailable = new Array();
    let workerUnavailable = new Array();

    let eventProgrammedAtTheSameTime = new Array();
    let timeEndClientTask = timeStart + duration;

    table.event.findAll({where:{
        $or:{
            $and:{
                timeEnd:{$gt:timeStartClientTask-15*60*1000},
                timeStart:{$lt:timeStartClientTask}
            },
            $and:{
                timeStart:{
                    $lt:timeEndClientTask+15*60*1000
                },
                timeEnd:{
                    $gt:timeEndClientTask
                }
            },
            $and:{
                timeStart:{
                    $gt:timeStartClientTask
                },
                timeEnd:{
                    $lt:timeEndClientTask
                }
            },
            $and:{
                timeStart:{
                    $lt:timeStartClientTask
                },
                timeEnd:{
                    $gt:timeEndClientTask
                }
            }


        }
    }}).then(function (rst) {
        rst.forEach(eventProgrammedAtTheSameTime.push(rst));
        workerUnavailable = unavailableWorkerSort(eventProgrammedAtTheSameTime);
        table.worker.findAll().then(function(rst){
            rst.forEach(function(){
                if(!isUnavailable(workerUnavailable,rst.get('mail')) && rst.get('possibleActivities') == activity){
                    workerAvailable.push(rst);
                }
            })
        },function () {
            workerAvailable = null;
        })
    },function(rst){
        workerAvailable = null;
    });

    return workerAvailable;
}