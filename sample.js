let lib = require('./src/pegin-address-verifier');
let base58 = require('./src/crypto/base58');
let { toHex } = require('./src/crypto/utils');

let address = 'mtqH7VWa3V3QfKanzVhDhWkxvMwJssMrC9';
let decoded = base58.decode(address);

console.log('address', address);
console.log('base58 decoded', toHex(decoded));
console.log('splitted', lib.getAddressInformation(address));

let wifPrivateKey = 'cPeJu3doUfs2K59HoEMpDRUEGBX8zS4aP4LsMJXCY6zifRN7BQwo';
let decodedPrivateKey = base58.decode(wifPrivateKey);
let privateKey = decodedPrivateKey.slice(1, decodedPrivateKey.length - 4);
console.log('private key', toHex(privateKey));