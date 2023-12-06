const dotenv = require("dotenv");
const ethers = require("ethers");

dotenv.config(); // load env vars from .env

require("@nomicfoundation/hardhat-toolbox");

const { SEPOLIA_ARCHIVE_URL, TESTING_ACCOUNT_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      { version: "0.6.0" },
      { version: "0.8.19" }
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: SEPOLIA_ARCHIVE_URL,
        blockNumber: 4831347,
      },
      accounts: [{privateKey: TESTING_ACCOUNT_PRIVATE_KEY, balance: ethers.parseEther('10000').toString()}],
    },
    sepolia: {
      url: SEPOLIA_ARCHIVE_URL,
      accounts: [TESTING_ACCOUNT_PRIVATE_KEY],
    },
  },
  mocha: {
    timeout: 300 * 1e3,
  }
};
