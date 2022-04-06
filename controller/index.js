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
  accounts: {
    get: async function (req, res) {
      const accountAddress = req.params.accountAddress;
      let response;
      try {
        response = await caver.rpc.klay.getAccount(accountAddress);
      } catch (err) {
        res.status(400);
        res.send({ message: "The account does not exist" });
        return;
      }
      switch (response.accType) {
        // Account가 EOA 계정일 때
        case 1: {
          res.status(200);
          res.send({ type: "EOA", data: response });
          return;
        }
        // Acount가 SCA 계정일 때
        case 2: {
          try {
            // KIP7 Interface가 구현되었는지 확인
            const isKIP7 = await caver.kct.kip7.detectInterface(accountAddress);
            if (isKIP7.IKIP7) {
              const kip7 = await new caver.kct.kip7(accountAddress);
              const name = await kip7.name();
              const symbol = await kip7.symbol();
              const decimals = await kip7.decimals();
              const totalSupply = await kip7.totalSupply();
              res.status(200);
              res.send({
                type: "KIP7 Token",
                name,
                symbol,
                decimals,
                totalSupply,
                data: response,
              });
              return;
            }

            // KIP17 Interface가 구현되었는지 확인
            const isKIP17 = await caver.kct.kip17.detectInterface(
              accountAddress
            );
            if (isKIP17.IKIP17) {
              const kip17 = await new caver.kct.kip17(accountAddress);
              const name = await kip17.name();
              const symbol = await kip17.symbol();
              const totalSupply = await kip17.totalSupply();
              res.status(200);
              res.send({
                type: "KIP17 Token",
                name,
                symbol,
                totalSupply,
                data: response,
              });
              return;
            }
          } catch (err) {
            res.status(200);
            res.send({
              type: "SCA",
              data: response,
            });
            return;
          }
        }
      }
    },
  },
};
