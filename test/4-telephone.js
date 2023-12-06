const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("Telephone");
  const challengeAddress = await createChallenge(`0x2C2307bb8824a0AbBf2CC7D76d8e63374D2f8446`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 4-Telephone", async function () {
  const challenge = await getChallenge();

  const [eoa] = await ethers.getSigners();

  const factory = await ethers.getContractFactory("TelephoneAttacker");
  const contract = await factory.deploy(await challenge.getAddress(), eoa);
  await contract.waitForDeployment();

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
