/**
 * Created by alexis on 22/12/16.
 */

let SequelizePaket = require('sequelize');
let sequelize = new SequelizePaket('UZENGO_DB','root','uzengoMDP');
let exports2 = module.exports = {};
let queryInterface = sequelize.getQueryInterface();

exports2.sequelize = sequelize;

/*--- Authentication ---*/
exports2.authentication = sequelize.define('u_authentications', {
    mail: {
        type: SequelizePaket.STRING,
        field: 'a_mail',
        primaryKey: true
    },
    privilege: {
        type: SequelizePaket.STRING,
        field: 'a_privilege'
    },
    hash: {
        type: SequelizePaket.STRING,
        field: 'a_hash'
    },
    algorithm: {
        type: SequelizePaket.STRING,
        field: 'a_algorithm'
    }
});

exports2.serviceAvailable = sequelize.define('u_service',{
    name:{
        type: SequelizePaket.STRING,
        field: 's_name',
        primaryKey: true
    },
    description:{
        type: SequelizePaket.STRING,
        field: 's_desc'
    }
})

/*--- BusinessContractor ---*/
exports2.businessContractor = sequelize.define('u_business_contractors', {
    address: {
        type: SequelizePaket.STRING,
        field: 'b_address'
    },
    postalcode:{
        type: SequelizePaket.STRING,
        field: 'b_postalcode'
    },
    town:{
        type: SequelizePaket.STRING,
        field: 'b_town'
    },
    country:{
        type: SequelizePaket.STRING,
        field: 'b_country'
    },
    mail: {
        type: SequelizePaket.STRING,
        field: 'b_mail',
        primaryKey: true
    },
    name: {
        type: SequelizePaket.STRING,
        field: 'b_name'
    },
    phoneNumber: {
        type: SequelizePaket.STRING,
        field: 'b_phone_number'
    },
    referentName: {
        type: SequelizePaket.STRING,
        field: 'b_referent_name'
    },
    vatNumber: {
        type: SequelizePaket.STRING,
        field: 'b_vat_number'
    }
});

/*--- Coupon ---*/
exports2.coupon = sequelize.define('u_coupons', {
    dateOfValidity: {
        type: SequelizePaket.DATE,
        field: 'c_date_of_validity'
    },
    discount: {
        type: SequelizePaket.STRING,
        field: 'c_discount'
    },
    duration: {
        type: SequelizePaket.INTEGER,
        field: 'c_duration'
    },
    hash: {
        type: SequelizePaket.STRING,
        field: 'c_hash'
    },
    idCoupon: {
        type: SequelizePaket.BIGINT,
        field: 'c_id_coupon',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idOrderBusiness: {
        type: SequelizePaket.BIGINT,
        field: 'c_id_order_business',
        allowNull: true
    },
    mail:{
        type: SequelizePaket.STRING,
        field: 'c_final_user',
        allowNull: false
    },
    status: {
        type: SequelizePaket.BOOLEAN,
        field: 'c_status'
    },
    numberOfUse:{
        type: SequelizePaket.INTEGER,
        field: 'c_number_of_use'
    }
});

/*--- Icon ---*/
exports2.icon = sequelize.define('u_icons', {
    mail: {
        type: SequelizePaket.STRING,
        field: 'i_mail',
        primaryKey: true
    },
    url: {
        type: SequelizePaket.STRING,
        field: 'i_url'
    }
});

/*--- OrderB ---*/
exports2.orderB = sequelize.define('u_order_bs', {//TODO: vérifier le lien entre l'orderB et l'entreprise ?
    dateStart: {
        type: SequelizePaket.DATE,
        field: 'o_date_of_validity'
    },
    globalExpirationDate: {
        type: SequelizePaket.DATE,
        field: 'o_global_expiration_date'
    },
    obId: {
        type: SequelizePaket.BIGINT,
        field: 'o_ob_id',
        primaryKey: true,
        autoIncrement: true
    },
    mail:{
        type: SequelizePaket.STRING,
        field: 'o_mail'
    },
    obStatus: {
        type: SequelizePaket.BOOLEAN,
        field: 'o_ob_status'
    },
    obStatusPayment: {
        type: SequelizePaket.BOOLEAN,
        field: 'o_ob_status_payment'
    },
    purchaseDate: {
        type: SequelizePaket.DATE,
        field: 'o_purchase_date'
    },
    quantityOfCoupon: {
        type: SequelizePaket.INTEGER,
        field: 'o_quantity_of_coupon',
        allowNull: false
    },
    price: {
        type: SequelizePaket.INTEGER,
        field: 'o_price'
    }
});

/*--- OrderU ---*/
exports2.orderU = sequelize.define('u_order_us', {//TODO: vérifier le lien entre l'orderU et le client ?
    dateOfStart: {
        type: SequelizePaket.DATE,
        field: 'o_date_start'
    },
    duration: {
        type: SequelizePaket.INTEGER,
        field: 'o_duration'
    },
    ouCouponId: {
        type: SequelizePaket.BIGINT,
        field: 'o_ou_coupon_id',
        allowNull: false
    },
    ouId: {
        type: SequelizePaket.BIGINT,
        field: 'o_ou_id',
        primaryKey: true,
        autoIncrement: true
    },
    ouStatus: {
        type: SequelizePaket.BOOLEAN,
        field: 'o_ou_status',
        default: false
    },
    ouStatusPayment: {
        type: SequelizePaket.BOOLEAN,
        field: 'o_ou_status_payment',
        default: false
    },
    purchaseDate: {
        type: SequelizePaket.DATE,
        field: 'o_purchase_date'
    },
    price:{
        type: SequelizePaket.FLOAT,
        field: 'o_price'
    },
    mail:{
        type: SequelizePaket.STRING,
        field: 'o_mail',
        allowNull: false
    },
    service:{
        type: SequelizePaket.STRING,
        field: 'o_service'
    }
});

/*--- User ---*/
exports2.user = sequelize.define('u_users', {
    address: {
        type: SequelizePaket.STRING,
        field: 'u_address'
    },
    postalcode:{
        type: SequelizePaket.STRING,
        field: 'u_postalcode'
    },
    town:{
        type: SequelizePaket.STRING,
        field: 'u_town'
    },
    country:{
        type: SequelizePaket.STRING,
        field: 'u_country'
    },
    firstName: {
        type: SequelizePaket.STRING,
        field: 'u_first_name'
    },
    lastName: {
        type: SequelizePaket.STRING,
        field: 'u_last_name'
    },
    mail: {
        type: SequelizePaket.STRING,
        field: 'u_mail',
        primaryKey: true,
        allowNull: false
    },
    phoneNumber: {
        type: SequelizePaket.STRING,
        field: 'u_phone_number'
    }
});

/*--- LinkUserUzengo ---*/
exports2.linkUserUzengo = sequelize.define('u_link_user_uzengo',{
    mail:{
        type: SequelizePaket.STRING,
        field: 'l_mail',
        primaryKey: true
    }
});

/*--- LinkUserLalux ---*/
exports2.linkUserLalux = sequelize.define('u_link_user_lalux',{
    mail: {
        type: SequelizePaket.STRING,
        field: 'l_mail',
        primaryKey: true
    }
});

/*--- Worker ---*/
exports2.worker = sequelize.define('u_workers', {
    address: {
        type: SequelizePaket.STRING,
        field: 'w_address'
    },
    postalcode:{
        type: SequelizePaket.STRING,
        field: 'w_postalcode'
    },
    town:{
        type: SequelizePaket.STRING,
        field: 'w_town'
    },
    country:{
        type: SequelizePaket.STRING,
        field: 'w_country'
    },
    firstName: {
        type: SequelizePaket.STRING,
        field: 'w_first_name',
        allowNull: false
    },
    lastName: {
        type: SequelizePaket.STRING,
        field: 'w_last_name',
        allowNull: false
    },
    mail: {
        type: SequelizePaket.STRING,
        field: 'w_mail',
        primaryKey: true
    },
    phoneNumber: {
        type: SequelizePaket.STRING,
        field: 'w_phone_number'
    },
    companyId: {
        type: SequelizePaket.BIGINT,
        field: 'w_company_id'
    },
    VATnumber:{
        type: SequelizePaket.STRING,
        field: 'w_vat_number'
    },
    socialReason:{
        type: SequelizePaket.STRING,
        field: 'w_social_reason'
    },
    aggreementNumber:{
        type: SequelizePaket.STRING,
        field: 'w_aggreement_number'
    },
    possibleActivities:{
        type: SequelizePaket.INTEGER,
        field: 'w_possible_activities'
    }
});

/*--- WorkerCompany ---*/
exports2.workerCompany = sequelize.define('u_worker_companies', {
    address: {
        type: SequelizePaket.STRING,
        field: 'e_address'
    },
    postalcode:{
        type: SequelizePaket.STRING,
        field: 'e_postalcode'
    },
    town:{
        type: SequelizePaket.STRING,
        field: 'e_town'
    },
    country:{
        type: SequelizePaket.STRING,
        field: 'e_country'
    },
    companyId: {
        type: SequelizePaket.BIGINT,
        field: 'e_company_id',
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    companyName: {
        type: SequelizePaket.STRING,
        field: 'e_company_Name'
    },
    companyPhoneNumber: {
        type: SequelizePaket.STRING,
        field: 'e_company_phone_number'
    },
    mail: {
        type: SequelizePaket.STRING,
        field: 'e_mail'
    },
    referentName: {
        type: SequelizePaket.STRING,
        field: 'e_referent_name'
    },
    vatNumber: {
        type: SequelizePaket.STRING,
        field: 'e_vat_number'
    }
});

/*--- Events ---*/
exports2.event = sequelize.define('u_events_ws', {
    mailWorker: {
        type: SequelizePaket.STRING,
        field: 'e_mail_w',
        allowNull: false
    },
    mailCreator: {
        type: SequelizePaket.STRING,
        field: 'e_mail_c',
        allowNull: false
    },
    address:{
        type: SequelizePaket.STRING,
        field: 'e_address'
    },
    postalcode:{
        type: SequelizePaket.STRING,
        field: 'e_postalcode'
    },
    town:{
        type: SequelizePaket.STRING,
        field: 'e_town'
    },
    country:{
        type: SequelizePaket.STRING,
        field: 'e_country'
    },
    timeStart: {
        type: SequelizePaket.DATE,
        field: 'e_time_start'
    },
    duration: {
        type: SequelizePaket.INTEGER,
        field: 'e_duration',
        allowNull: false
    },
    timeEnd:{
        type: SequelizePaket.DATE,
        field: 'e_time_end',
        set: function (val) {
            this.setDataValue('e_time_end',this.getDataValue('e_time_start')+this.getDataValue('e_duration'))
        }
    },
    idEvent: {
        type: SequelizePaket.BIGINT,
        field: 'e_id_event',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    task: {
        type: SequelizePaket.STRING,
        field: 'e_task',
        //allowNull: false,
        set: function (val) {
            this.setDataValue(task, val.toUpperCase())
        }
    }
});

//queryInterface.addIndex('u_events_ws', ['e_mail_w', 'e_time_start']);
//queryInterface.addIndex('u_events_ws', ['e_mail_c']);

sequelize.sync();
