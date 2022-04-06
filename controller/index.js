const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651/");

module.exports = {
  blocks: {
    //Get Block By Number or Hash
    getByNumberOrHash: async function (req, res) {
      const blockNumberOrHash = req.params.blockNumberOrHash;
      try {
        const response = await caver.rpc.klay.getBlock(blockNumberOrHash, true);
        res.status(200);
        res.send(response);
      } catch (err) {
        res.status(400);
        res.send({ message: "The block does not exist" });
      }
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
        res.status(200);
        result.push(response);
      }
      res.send(result);
    },
  },
  txs: {
    //Get transaction by Hash
    get: async function (req, res) {
      const txHash = req.params.txHash;
      try {
        const response = await caver.rpc.klay.getTransactionByHash(txHash);
        res.status(200);
        res.send(response);
      } catch (err) {
        res.status(400);
        res.send({ message: "The transaction does not exist" });
      }
    },
  },
};
