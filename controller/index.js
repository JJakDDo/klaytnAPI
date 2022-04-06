module.exports = {
  blocks: {
    get: function (req, res) {
      res.send("hello blocks");
    },
  },
  txs: {
    get: function (req, res) {
      res.send("hello txs");
    },
  },
};
