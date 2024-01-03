const p2pkhP2sh = require('./crypto/p2pkh-p2sha');
const segwit = require('./crypto/segwit-addr');
const { ADDRESS_TYPES, ADDRESS_TYPES_CODES } = require('./crypto/constants');

const RSKT_PREFIX_HEX = '52534b54'; // 'RSKT' prefix encoded in hex. Check https://github.com/rsksmart/RSKIPs/blob/2c994cc108885ccc5a116e4aee8c073b5eca5682/IPs/RSKIP170.md
const RSKT_PROTOCOL_VERSION = '01';

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
    },
    createPeginV1TxData: (rskDestinationAddress, btcRefundAddress) => {

        let data = `${RSKT_PREFIX_HEX}${RSKT_PROTOCOL_VERSION}}`;
        
        if (rskDestinationAddress.startsWith('0x')) {
            rskDestinationAddress = rskDestinationAddress.substring(2);
        }

        data += rskDestinationAddress;
    
        if (btcRefundAddress) {
            const refundAddressInfo = this.getAddressInformation(btcRefundAddress);
            if (refundAddressInfo) {
                data += ADDRESS_TYPES_CODES[refundAddressInfo.type];
                switch (refundAddressInfo.type) {
                    case 'p2pkh':
                        data += refundAddressInfo.scriptPubKey;
                        break;
                    case 'p2sh':
                        data += refundAddressInfo.scriptHash;
                        break;
                    default:
                        throw new Error(`Unsupported btc refund address type: ${refundAddressInfo.type}`);
                }
            } else {
                throw new Error(`Could not get address information for ${btcRefundAddress}`);
            }
        }
        
        return data;
    }
};
