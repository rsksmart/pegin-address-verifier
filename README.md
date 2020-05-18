# pegin-address-verificator

This NPM tool can be used to verify address before interacting with the two-way peg system of the RSK network.

## Requirements

run `npm install`.

## Methods

### isValidAddress
Given a `string` representing a BTC address and the network (`mainnet` or `testnet`), will indicate with a `boolean` if the address is valid or not.

### getAddressInformation
Given a `string` representing a BTC address, will return information about the address. The information includes the type and the network it belongs to. e.g.:
```
{
 type: 'p2pkh',
 network: 'mainnet'
}
```
If the address is not a valid one, this method will return `null`
### canPegIn
Given an address information (the object obtained calling `getAddressInformation` it will indicate if the address can operate with the RSK network peg-in system.

## How to use it

Simply require the package and use the available methods.
e.g.
```
const peginAddressVerificator = require('pegin-address-verificator');
let address = '12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y';
let addressInformation = peginAddressVerificator.getAddressInformation(address);
let canPegIn = peginAddressVerificator.canPegIn(addressInformation);
console.log(`can peg-in with ${address}? ${canPegIn}`);
```
