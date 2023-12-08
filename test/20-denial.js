const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("Denial");
  const challengeAddress = await createChallenge(`0x2427aF06f748A6adb651aCaB0cA8FbC7EaF802e6`, ethers.parseEther("0.001"))
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 20-Denial", async function () {
  const challenge = await getChallenge();

  const factory = await ethers.getContractFactory("DenialAttack");
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  tx = await challenge.setWithdrawPartner(contractAddress);
  await tx.wait();

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
