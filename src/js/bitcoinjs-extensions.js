
function estimateFee (type) {
  return function (tx) {
    var network = networks[type]
    var baseFee = network.feePerKb
    var byteSize = tx.toBuffer().length

    var fee = baseFee * Math.ceil(byteSize / 1000)
    if (network.dustSoftThreshold === undefined) return fee

    tx.outs.forEach(function (e) {
      if (e.value < network.dustSoftThreshold) {
        fee += baseFee
      }
    })

    return fee
  }
}

bitcoin.networks.zencash = {
    magicPrefix: '\x19Zcash Signed Message:\n',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4
    },
    pubKeyHash: 0x2089,
    scriptHash: 0x2096,
    wif: 128,
}

bitcoin.networks.zencash_testnet = {
  magicPrefix: '\x19Zcash Signed Message:\n',
  bip32: {
    public: 0x043587cf,
    private: 0x04358394,
  },
  pubKeyHash: 0x2098,
  scriptHash: 0x2092,
  wif: 0xef,
}

