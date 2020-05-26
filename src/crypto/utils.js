var jsSHA = require('jssha/src/sha256');

function numberToHex (number) {
    var hex = Math.round(number).toString(16);
    if(hex.length === 1) {
        hex = '0' + hex;
    }
    return hex;
}
function sha256(hexString) {
    var sha = new jsSHA('SHA-256', 'HEX');
    sha.update(hexString);
    return sha.getHash('HEX');
}

module.exports = {
    toHex: function (arrayOfBytes) {
        var hex = '';
        for(var i = 0; i < arrayOfBytes.length; i++) {
            hex += numberToHex(arrayOfBytes[i]);
        }
        return hex;
    },
    sha256Checksum: function (payload) {
        return sha256(sha256(payload)).substr(0, 8);
    }
};
