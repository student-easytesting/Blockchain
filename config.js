const MINE_RATE = 1000; //1s = 1000ms
const INITIAL_DIFFICULTY = 2;
const GENESIS_DATA = {
  timestamp: 1720067725081,
  prevHash: "0x000",
  hash: "fad6bf5465552da44c86b0a57a56f2407c1bd737ce22def36386b43e79958882",
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  data: ` Sounak Das, Prof. Anindya Kr Biswas, Blockchain based E-Voting Project, Techno India University`,
  number: 1,
};
module.exports = { GENESIS_DATA, MINE_RATE };
