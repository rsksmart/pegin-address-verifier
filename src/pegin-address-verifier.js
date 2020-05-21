var p2pkhP2sh = require('./crypto/p2pkh-p2sha');
var segwit = require('./crypto/segwit-addr');
let { ADDRESS_TYPES } = require('./crypto/constants');

module.exports = {
    isValidAddress: function (address, networkType) {
        return p2pkhP2sh.isValid(address, networkType) || 
        segwit.isValidAddress(address, networkType);
    },
    getAddressInformation: (address) => {
        return p2pkhP2sh.getAddressInfo(address) || 
        segwit.getAddressInfo(address);
    },
    canPegIn: (addressInfo) => {
        return addressInfo && 
            addressInfo.type == ADDRESS_TYPES.P2PKH || 
            addressInfo.type == ADDRESS_TYPES.P2SH;
    }
};
