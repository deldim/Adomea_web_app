/**
 * Created by alexis on 22/02/17.
 */
let table = require('./DbDefine');

/*--- Variable ---*/
let exp = module.exports = {};
let Debug = false;

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

/*--- Authentication ---*/
exp.createAuth = function(mail, privilege, hash, algorithm) {
    table.sequelize.sync().then(function (){
        return table.authentication.create({
                mail: mail,
                privilege:privilege,
                hash: hash,
                algorithm: algorithm
            }
        )}
    ).then(log);

}


/*--- BusinessContractor ---*/
exp.createBusinessContractor = function (address, postalCode, town, country, mail, name, phoneNumber, referentName, vatNumber){

    table.sequelize.sync().then(function (){
        return table.businessContractor.create({
            address: address,
            postalcode: postalCode,
            town: town,
            country: country,
            mail: mail,
            name: name,
            phoneNumber: phoneNumber,
            referentName: referentName,
            vatNumber: vatNumber
            }
        )}
    ).then(log);


}

/*--- LinkUserUzengo ---*/
exp.createLinkUserUzengo = function(mail){
  table.sequelize.sync().then(function(){
    return table.linkUserUzengo.create({
      mail: mail
    })
  }).then(log);
}

/*--- LinkUserLalux ---*/
exp.createLinkUserLalux = function(mail){
  table.sequelize.sync().then(function(){
    return table.linkUserLalux.create({
      mail: mail
    })
  }).then(log);
}



/*--- Coupon ---*/
exp.createCoupon = function(dateOfValidity, discount, duration, hash, idCoupon,mail, idOrderBusiness, status, numberOfUse){

    table.sequelize.sync().then(function (){
        return table.coupon.create({
                dateOfValidity: dateOfValidity,
                discount: discount,
                duration: duration,
                hash: hash,
                mail: mail,
                idCoupon: idCoupon,
                idOrderBusiness: idOrderBusiness,
                status: status,
                numberOfUse:numberOfUse
            }
        )}
    ).then(log);


}


/*--- Icon ---*/
exp.createIcon = function (mail,url){

    table.sequelize.sync().then(function (){
        return table.icon.create({
                mail: mail,
                url: url
            }
        )}
    ).then(log);


}


/*--- OrderB ---*/
exp.createOrderB = function (dateStart, globalExpirationDate, obId, obStatus, obStatusPayment, purchaseDate, quantityOfCoupon, price){

    table.sequelize.sync().then(function (){
        return table.orderB.create({
                dateStart: dateStart,
                globalExpirationDate: globalExpirationDate,
                obId: obId,
                obStatus: obStatus,
                obStatusPayment: obStatusPayment,
                purchaseDate: purchaseDate,
                quantityOfCoupon: quantityOfCoupon,
                price: price
            }
        )}
    ).then(log);


}


/*--- OrderU ---*/
/*exp.createOrderU= function(dateOfValidity, duration, expirationDate, ouCouponId, ouId, ouStatus, ouStatusPayment, purchaseDate){

    table.sequelize.sync().then(function (){
        return table.orderU.create({
                dateOfValidity: dateOfValidity,
                duration: duration,
                expirationDate: expirationDate,
                ouCouponId: ouCouponId,
                ouId: ouId,
                ouStatus: ouStatus,
                ouStatusPayment: ouStatusPayment,
                purchaseDate: purchaseDate
            }
        )}
    ).then(log);


}*/

exp.createOrderU = function(dateOfStart,duration,ouCouponId,ouId,ouStatus,ouStatusPayment,purchaseDate,price,mail, service){
    table.sequelize.sync().then(function(){
        return table.orderU.create({
            dateOfStart: dateOfStart,
            duration: duration,
            ouCouponId: ouCouponId,
            ouStatus: ouStatus,
            ouStatusPayment: ouStatusPayment,
            purchaseDate: purchaseDate,
            price: price,
            mail: mail,
            service: service
        })
    }).then(log);
}


/*--- User ---*/
exp.createUser = function (address, postalCode, town, country, firstName, lastName, mail, phoneNumber){

    table.sequelize.sync().then(function (){
        return table.user.create({
                address: address,
            postalcode: postalCode,
            town: town,
            country: country,
                firstName: firstName,
                lastName: lastName,
                mail: mail,
                phoneNumber: phoneNumber
            }
        )}
    ).then(log);


}


/*--- Worker ---*/
exp.createWorker = function (address, postalCode, town, country, firstName, lastName, mail, phoneNumber, companyId, VATnumber, socialReason, aggreementNumber, possibleActivities){

    table.sequelize.sync().then(function (){
        return table.worker.create({
                address: address,
                postalcode:postalCode,
                town: town,
                country: country,
                firstName: firstName,
                lastName: lastName,
                mail: mail,
                phoneNumber: phoneNumber,
                companyId: companyId,
                VATnumber: VATnumber,
                socialReason: socialReason,
                aggreementNumber: aggreementNumber,
                possibleActivities: possibleActivities
            }
        )}
    ).then(log);
}

/*--- WorkerCompany ---*/
exp.createWorkerCompany = function (address, postalCode, town, country, companyId, companyName, companyPhoneNumber, mail, referentName, vatNumber){

    table.sequelize.sync().then(function (){
        return table.workerCompany.create({
                address: address,
            postalCode:postalCode,
            town: town,
            country: country,
                mail: mail,
                companyId: companyId,
                companyName: companyName,
                companyPhoneNumber: companyPhoneNumber,
                referentName: referentName,
                vatNumber: vatNumber
            }
        )}
    ).then(log);

}
