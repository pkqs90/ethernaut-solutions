const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallengeAddress() {
  const challengeAddress = await createChallenge(`0xb6c2Ec883DaAac76D8922519E63f875c2ec65575`)
  return challengeAddress;
}

it("Solves 7-Force", async function () {
  const challengeAddress = await getChallengeAddress();

  const factory = await ethers.getContractFactory("ForceAttacker");
  const contract = await factory.deploy(challengeAddress, {value: 1});
  await contract.waitForDeployment();

  expect(await submitLevel(challengeAddress)).to.equal(true);
});
