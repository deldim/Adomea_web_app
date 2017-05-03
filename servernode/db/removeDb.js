/**
 * Created by alexis on 22/02/17.
 */
let table = require('./DbDefine');
let exp = module.exports = {};

/*--- Authentication ---*/
exp.deleteAuthEntry = function(mail) {
    table.authentication.delete(
        {
            where:{
                mail: mail
            }
        }
    )
}

/*--- BusinessContractor ---*/
exp.deleteBusinessContractor = function(mail){
    table.businessContractor.findBusinessContractorByMail(mail).delete(
    )
}

/*--- Coupon ---*/
exp.deleteCoupon = function (idCoupon) {
    table.coupon.findCouponByIdCoupon(idCoupon).delete()
}

/*--- Icon ---*/
exp.deleteIcon= function (mail) {
    table.icon.findIconByMail(mail).delete()
}

/*--- OrderB ---*/
exp.deleteOrderB= function (obId) {
    table.orderB.findOrderBById(obId).delete()
}

/*--- OrderU ---*/
exp.deleteOrderU = function (ouId) {
    table.orderU.findOrderUByOrderId(ouId)
}

/*--- User ---*/
exp.deleteUser = function (mail) {
    table.user.findUserByMail(mail).delete()
}

/*--- Worker ---*/
exp.deleteWorker = function (mail) {
    table.worker.findWorkerByMail(mail).delete()
}

/*--- WorkerComany ---*/
exp.deleteWorkerCompany = function (companyName) {
    table.workerCompany.findAll(
        {
            where:{
                companyName: companyName
            }
        }
    ).delete()
}

/*--- Events ---*/
exp.deleteEvents = function (idEvent) {
    table.event.findAll({where:{
        idEvent:idEvent
    }}).delete()
}