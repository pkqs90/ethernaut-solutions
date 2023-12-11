const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("GoodSamaritan");
  const challengeAddress = await createChallenge(`0x36E92B2751F260D6a4749d7CA58247E7f8198284`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 27-GoodSamaritan", async function () {
  const goodSamaritan = await getChallenge();
  const goodSamaritanAddress = await goodSamaritan.getAddress();

  const factory = await ethers.getContractFactory("GoodSamaritanAttacker");
  const goodSamaritanAttacker = await factory.deploy(goodSamaritanAddress);
  await goodSamaritanAttacker.waitForDeployment();

  await goodSamaritanAttacker.attack();

  expect(await submitLevel(goodSamaritanAddress)).to.equal(true);
});
