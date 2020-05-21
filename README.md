# pegin-address-verifier

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

### NodeJs

Require the package and use the available methods.

Sample usage:

```javascript
const peginAddressVerifier = require('pegin-address-verifier');
let address = '12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y';
let addressInformation = peginAddressVerifier.getAddressInformation(address);
let canPegIn = peginAddressVerifier.canPegIn(addressInformation);
console.log(`can peg-in with ${address}? ${canPegIn}`);
```

### Browser

Generate the browser bundle (UMD):

```shell
npm run build-umd
```

Include this file in your webpage, and interact with `RskPegInAddressVerifier`.

Sample usage:

```javascript
//isValidAddress
RskPegInAddressVerifier.isValidAddress('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', 'testnet');
// true

// getAddressInfo
RskPegInAddressVerifier.isValidAddress('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef');
// {"network":"testnet","type":"p2pkh"}

// canPegIn
RskPegInAddressVerifier.isValidAddress({ network: 'testnet', type: 'p2pkh' });
// true
```

## Demo

Run the following command to server up the demo page,
including the browser bundled version of this package:

```shell
npm run demo
```

- Visit [http://localhost:2345/](http://localhost:2345/).
- Open browser dev tools and use `RskPegInAddressVerifier` directly if desired.
- Alternatively enter an address, select the address type, and select a network in the fields displayed.
- Observe the output
