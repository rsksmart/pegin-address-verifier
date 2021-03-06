// Copyright (c) 2017 Pieter Wuille
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var bech32 = require('./bech32');
let { ADDRESS_TYPES, NETWORKS } = require('./constants');

const PREFIXES = {
  BC: 'bc',
  TB: 'tb',
  BCRT: 'bcrt'
}

const NETWORK_BY_PREFIX = {};
NETWORK_BY_PREFIX[PREFIXES.BC] = NETWORKS.MAINNET;
NETWORK_BY_PREFIX[PREFIXES.TB] = NETWORKS.TESTNET;
NETWORK_BY_PREFIX[PREFIXES.BCRT] = NETWORKS.REGTEST;

const PREFIX_BY_NETWORK = {};
PREFIX_BY_NETWORK[NETWORKS.MAINNET] = PREFIXES.BC;
PREFIX_BY_NETWORK[NETWORKS.TESTNET] = PREFIXES.TB;
PREFIX_BY_NETWORK[NETWORKS.REGTEST] = PREFIXES.BCRT;

function convertbits (data, frombits, tobits, pad) {
  var acc = 0;
  var bits = 0;
  var ret = [];
  var maxv = (1 << tobits) - 1;
  for (var p = 0; p < data.length; ++p) {
    var value = data[p];
    if (value < 0 || (value >> frombits) !== 0) {
      return null;
    }
    acc = (acc << frombits) | value;
    bits += frombits;
    while (bits >= tobits) {
      bits -= tobits;
      ret.push((acc >> bits) & maxv);
    }
  }
  if (pad) {
    if (bits > 0) {
      ret.push((acc << (tobits - bits)) & maxv);
    }
  } else if (bits >= frombits || ((acc << (tobits - bits)) & maxv)) {
    return null;
  }
  return ret;
}

function decode (hrp, addr) {
  var dec = bech32.decode(addr);
  if (dec === null || dec.hrp !== hrp || dec.data.length < 1 || dec.data[0] > 16) {
    return null;
  }
  var res = convertbits(dec.data.slice(1), 5, 8, false);
  if (res === null || res.length < 2 || res.length > 40) {
    return null;
  }
  if (dec.data[0] === 0 && res.length !== 20 && res.length !== 32) {
    return null;
  }
  return {version: dec.data[0], program: res};
}

function encode (hrp, version, program) {
  var ret = bech32.encode(hrp, [version].concat(convertbits(program, 8, 5, true)));
  if (decode(hrp, ret) === null) {
    return null;
  }
  return ret;
}

function isValidAddress(address, networkType) {
    let hrp = null;
    var ret = null;

    if (Object.values(NETWORKS).includes(networkType)) {
        hrp = PREFIX_BY_NETWORK[networkType];
        ret = decode(hrp, address);
    } else {
        let prefix = getAddressPrefix(address).toLowerCase();
        if (Object.values(PREFIXES).includes(prefix)) {
          hrp = prefix;
          ret = decode(hrp, address);
        }
    }

    if (ret === null) {
        return false;
    }

    var recreate = encode(hrp, ret.version, ret.program);
    return recreate === address.toLowerCase();
}

function getAddressInfo(address) {
  if (!address) {
    return null;
  }
  let prefix = getAddressPrefix(address);
  let network = NETWORK_BY_PREFIX[prefix.toLowerCase()];

  if (network && isValidAddress(address, network)) {
    return { network, type: ADDRESS_TYPES.BECH32 };
  }
  return null;
}

function getAddressPrefix(address) {
  let prefix = address.toString().substring(0,2);
  if (prefix === PREFIXES.BC) {
      // Could be mainnet or regtest
      let prefixRegtest = address.toString().substring(0,4);
      if (prefixRegtest === PREFIXES.BCRT) {
          prefix = PREFIXES.BCRT;
      }
  }

  return prefix;
}

module.exports = {
    isValidAddress: isValidAddress,
    getAddressInfo: getAddressInfo
};
