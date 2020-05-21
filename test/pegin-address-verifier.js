const chai = require('chai');
const expect = chai.expect;

const verifier = require('../src/pegin-address-verifier');
const { NETWORKS, ADDRESS_TYPES } = require('../src/crypto/constants');

function valid (address, networkType) {
    var result = verifier.isValidAddress(address, networkType);
    expect(result).to.be.true;
}

function invalid (address, networkType) {
    var result = verifier.isValidAddress(address, networkType);
    expect(result).to.be.false;
}

function validGetAddressInfo(address, expectedType, expectedNetwork) {
    let result = verifier.getAddressInformation(address);
    expect(result.type).to.be.equal(expectedType);
    expect(result.network).to.be.equal(expectedNetwork);
}

function invalidGetAddressInfo(address) {
    let result = verifier.getAddressInformation(address);
    expect(result).to.be.null;
}

describe('isValidAddress tests', () => {
    it('valid P2KH addresses', () => {
        valid('12KYrjTdVGjFMtaxERSk3gphreJ5US8aUP');
        valid('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y');
        valid('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y');
        valid('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y');
        valid('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y');
        valid('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y', NETWORKS.MAINNET);
        valid('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y', 'both');
        valid('1oNLrsHnBcR6dpaBpwz3LSwutbUNkNSjs');
        valid('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', NETWORKS.TESTNET);
        valid('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', 'both');
        valid('1SQHtwR5oJRKLfiWQ2APsAd9miUc4k2ez');
        valid('116CGDLddrZhMrTwhCVJXtXQpxygTT1kHd');
    });
    it('valid P2SH addresses', () => {
        valid('3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt');
        valid('3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt');
        valid('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7', NETWORKS.TESTNET);
    });
    it('valid BECH32 addresses', () => {
        valid('tb1qew3rpu4pvr0pftc8qtllll2cyam0p5u6rm54fd', NETWORKS.TESTNET);
        valid('tb1qew3rpu4pvr0pftc8qtllll2cyam0p5u6rm54fd', 'both');
        valid('BC1QW508D6QEJXTDG4Y5R3ZARVARY0C5XW7KV8F3T4');
        valid('tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7');
        valid('bc1pw508d6qejxtdg4y5r3zarvary0c5xw7kw508d6qejxtdg4y5r3zarvary0c5xw7k7grplx');
        valid('BC1SW50QA3JX3S');
        valid('bc1zw508d6qejxtdg4y5r3zarvaryvg6kdaj');
        valid('tb1qqqqqp399et2xygdj5xreqhjjvcmzhxw4aywxecjdzew6hylgvsesrxh6hy');
    });
    it('invalid cases', function () {
        invalid(''); //reject blank
        invalid('%%@'); //reject invalid base58 string
        invalid('1A1zP1ePQGefi2DMPTifTL5SLmv7DivfNa'); //reject invalid address
        invalid('bd839e4f6fadb293ba580df5dea7814399989983');  //reject transaction id's
        //testnet
        invalid('', NETWORKS.TESTNET); //reject blank
        invalid('%%@', NETWORKS.TESTNET); //reject invalid base58 string
        invalid('1A1zP1ePQGefi2DMPTifTL5SLmv7DivfNa', NETWORKS.TESTNET); //reject invalid address
        invalid('bd839e4f6fadb293ba580df5dea7814399989983', NETWORKS.TESTNET);  //reject transaction id's

        invalid('tb1qew3rpu4pvr0pftc8qtllll2cyam0p5u6rm54fd', NETWORKS.MAINNET);
        invalid('tc1qw508d6qejxtdg4y5r3zarvary0c5xw7kg3g4ty');
        invalid('bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t5');
        invalid('BC13W508D6QEJXTDG4Y5R3ZARVARY0C5XW7KN40WF2');
        invalid('bc1rw5uspcuh');
        invalid('bc10w508d6qejxtdg4y5r3zarvary0c5xw7kw508d6qejxtdg4y5r3zarvary0c5xw7kw5rljs90');
        invalid('BC1QR508D6QEJXTDG4Y5R3ZARVARYV98GJ9P');
        invalid('tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sL5k7');
        invalid('bc1zw508d6qejxtdg4y5r3zarvaryvqyzf3du');
        invalid('tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3pjxtptv');
        invalid('bc1gmk9yu');
    });
});

describe('getAddressInfo tests', () => {
    it('should get info for P2PKH', () => {
        validGetAddressInfo('12KYrjTdVGjFMtaxERSk3gphreJ5US8aUP', ADDRESS_TYPES.P2PKH, NETWORKS.MAINNET);
        validGetAddressInfo('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', ADDRESS_TYPES.P2PKH, NETWORKS.TESTNET);
    });
    it('should get info for P2SH', () => {
        validGetAddressInfo('3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt', ADDRESS_TYPES.P2SH, NETWORKS.MAINNET);
        validGetAddressInfo('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7', ADDRESS_TYPES.P2SH, NETWORKS.TESTNET);
    });
    it('should get info for BECH32', () => {
        validGetAddressInfo('BC1QW508D6QEJXTDG4Y5R3ZARVARY0C5XW7KV8F3T4', ADDRESS_TYPES.BECH32, NETWORKS.MAINNET);
        validGetAddressInfo('tb1qew3rpu4pvr0pftc8qtllll2cyam0p5u6rm54fd', ADDRESS_TYPES.BECH32, NETWORKS.TESTNET);
    });
    it('invalid cases', () => {
        invalidGetAddressInfo('XXX');
        invalidGetAddressInfo(null);
        invalidGetAddressInfo('12KYrjTdVGjFMtaxERSk3gphreJ5US8xxx');
    });
});

describe('canPegIn tests', () => {
    it('P2KH', () => {
        expect(verifier.canPegIn({ type: ADDRESS_TYPES.P2PKH })).to.be.true;
    });
    it('P2SH', () => {
        expect(verifier.canPegIn({ type: ADDRESS_TYPES.P2SH })).to.be.true;
    });
    it('BECH32', () => {
        expect(verifier.canPegIn({ type: ADDRESS_TYPES.BECH32 })).to.be.false;
    });
});
