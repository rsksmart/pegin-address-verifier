# pegin-address-verifier

This NPM tool can be used to verify address before interacting with the two-way peg system of the RSK network.

## Requirements

run `npm install`.

## Methods

### isValidAddress
Given a `string` representing a BTC address and the network (`mainnet` or `testnet`), will indicate with a `boolean` if the address is valid or not.

### getAddressInformation
Given a `string` representing a BTC address, will return information about the address. The information includes the type and the network it belongs to. In case of a P2PKH or P2SH address type, the information also includes the script hash that can be used to obtain the address. This is useful for peg-in protocol version 1, see [RSKIP 170](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP170.md) e.g.:
```
{
 type: 'p2pkh',
 network: 'mainnet',
 scriptPubKey: 'ccc198c15d8344c73da67a75509a85a8f4226636'
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
const peginAddressverifier = require('pegin-address-verifier');
let address = '12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y';
let addressInformation = peginAddressverifier.getAddressInformation(address);
let canPegIn = peginAddressverifier.canPegIn(addressInformation);
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

// Creating pegin v1 data, without a btc refund address

const rskAddress = '0xa65C9bF91Ae59fC5bE36300D0BC271998529bb75';
const peginV1Data = RskPegInAddressVerifier.createPeginV1TxData(rskAddress);
console.log(peginV1Data); // 52534b5401a65c9bf91ae59fc5be36300d0bc271998529bb75

// Creating pegin v1 data, with a btc refund address

const rskAddress = '0xa65C9bF91Ae59fC5bE36300D0BC271998529bb75';
const btcAddress = 'mtEjrPcxR76W7VxE7eZnptf4PqSDez4VAn';
const peginV1Data = RskPegInAddressVerifier.createPeginV1TxData(rskAddress, btcAddress);
console.log(peginV1Data); // 52534b5401a65c9bf91ae59fc5be36300d0bc271998529bb75018b8897e5cf38053a49aa841d6c8864a7d92cdc2b

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
