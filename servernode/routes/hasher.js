let exp = module.exports = {};

exp.hash = function (email,password) {
    var crypto = require('crypto'),
        text = '';

    // create hahs
    var hash = crypto.createHmac('sha512', email + password)
    hash.update(text)
    var value = hash.digest('hex');

    return value;
}

exp.generate_word = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

exp.generate_date = function (date) {
    return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
}


