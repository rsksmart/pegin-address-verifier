const ADDRESS_TYPES = {
    P2PKH: 'p2pkh',
    P2SH: 'p2sh',
    BECH32: 'bech32'
};

const NETWORKS = {
    MAINNET: 'mainnet',
    TESTNET: 'testnet',
    REGTEST: 'regtest'
}

const HASH_FIELD_NAMES = {
    p2pkh: 'scriptPubKey',
    p2sh: 'scriptHash'
}

module.exports = {
    ADDRESS_TYPES,
    NETWORKS,
    HASH_FIELD_NAMES
};
