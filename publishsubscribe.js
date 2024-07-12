const redis = require("redis");

const CHANNELS = {
  TEST: "TEST",
  BLOCKCHAIN: "BLOCKCHAIN",
};
class PubSub {
  constructor({ blockchain }) {
    this.blockchain = blockchain;
    this.publisher = redis.createClient({
      host: "43.204.9.103",
      port: 6379,
      retry_strategy: function (options) {
        if (options.error && options.error.code === "ECONNREFUSED") {
          // Try reconnecting after 5 seconds
          return 5000;
        }
        return Math.min(options.attempt * 100, 3000); // Reconnect after increasing intervals
      },
    });
    this.subscriber = redis.createClient({
      host: "43.204.9.103",
      port: 6379,
      retry_strategy: function (options) {
        if (options.error && options.error.code === "ECONNREFUSED") {
          // Try reconnecting after 5 seconds
          return 5000;
        }
        return Math.min(options.attempt * 100, 3000); // Reconnect after increasing intervals
      },
    });

    this.subscriber.subscribe(CHANNELS.TEST);
    this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);

    this.subscriber.on("message", (channel, message) =>
      this.handleMessage(channel, message)
    );
  }
  handleMessage(channel, message) {
    console.log(`Message recieved.Channel: ${channel} Message:${message}`);
    const parseMessage = JSON.parse(message);

    if (channel === CHANNELS.BLOCKCHAIN) {
      this.blockchain.replaceChain(parseMessage);
    }
  }
  publish({ channel, message }) {
    this.publisher.publish(channel, message);
  }
  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }
}

module.exports = PubSub;
// const checkPubSub = new PubSub();
// setTimeout(
//   () => checkPubSub.publisher.publish(CHANNELS.TEST, "Hellloooo"),
//   1000
// );
