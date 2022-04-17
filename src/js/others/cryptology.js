var aes256 = require('aes256');

function encrypt(pasw,data){
    return aes256.encrypt(pasw, data);
}

function decrypt(pasw,data){
    return aes256.decrypt(pasw, data);
}

function encryptNode(pasw,node){
    node = encrypt(pasw,JSON.stringify(node));
    return node;
}

function decryptNode(pasw,node){
    node = JSON.parse(decrypt(pasw,node));
    return node;
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.decryptNode = decryptNode;
exports.encryptNode = encryptNode;