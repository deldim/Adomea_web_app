/**
 * Created by alexis on 22/02/17.
 */
let exp = module.exports = {};
let table = require('./DbDefine');

/*--- Authentication mail, privilege, algorithm ---*/
exp.updateAuthHash = function (mail, hash) {
    table.authentication.update(
        {hash :  hash},
        {where: {
        mail: mail
        }}
    )
}

/*--- BusinessContractor address, postalCode, town, country, mail, name, phoneNumber, referentName, vatNumber ---*/

/*--- Coupon dateOfValidity, discount, duration, hash, idCoupon, idOrderBusiness, mail, status numberOfUse ---*/

/*--- Icon mail, url ---*/

/*--- OrderB dateOfValidity, globalExpirationDate obId, mail, obStatus, obStatusPayment, purchaseDate, quantityOfCoupon ---*/

/*--- OrderU dateOfValidity, duration, expirationDate, ouCouponId, ouId, ouStatus, ouStatusPayment, purchaseDate, mail ---*/

/*--- User address, postalCode, town, country, firstName, lastName, mail, phoneNumber ---*/

/*--- Worker address, postalCode, town, country, firstName, lastName, mail, phoneNumber, companyId ---*/

/*--- WorkerCompany address, town, country, companyId, companyName, companyPhoneNumber, mail, referentName, vatNumber ---*/

/*--- Event mailWorker, mailCreator, address, postalCode, town, country, timeStart, duration, timeEnd, idEvent, task ---*/