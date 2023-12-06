const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("CoinFlip");
  const challengeAddress = await createChallenge(`0xA62fE5344FE62AdC1F356447B669E9E6D10abaaF`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

async function getAttackerContract(address) {
  const factory = await ethers.getContractFactory("CoinFlipAttacker");
  const contract = await factory.deploy(address);
  return contract;
}

it("Solves 3-Coinflip", async function () {
  const challenge = await getChallenge();
  const attackContract = await getAttackerContract(await challenge.getAddress());

  for (let i = 0; i < 10; ++i) {
    tx = await attackContract.attack();
    await tx.wait();
  }

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
