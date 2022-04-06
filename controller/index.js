const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651/");

module.exports = {
  blocks: {
    //Get Block By Number or Hash
    getByNumberOrHash: async function (req, res) {
      const blockNumberOrHash = req.params.blockNumberOrHash;
      const response = await caver.rpc.klay.getBlock(blockNumberOrHash, true);
      res.send(response);
    },
    //Get latest N Blocks
    getLatestBlocks: async function (req, res) {
      const amount = req.query.amount;
      const result = [];
      const latestBlockNumberInHex = await caver.rpc.klay.getBlockNumber();
      const latestBlockNumberInDec = parseInt(latestBlockNumberInHex, 16);
      for (
        let i = latestBlockNumberInDec;
        i > latestBlockNumberInDec - amount;
        i--
      ) {
        const response = await caver.rpc.klay.getBlock(i);
        result.push(response);
      }
      res.send(result);
    },
  },
  txs: {
    get: function (req, res) {
      res.send("hello txs");
    },
  },
};
