const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("Elevator");
  const challengeAddress = await createChallenge(`0x6DcE47e94Fa22F8E2d8A7FDf538602B1F86aBFd2`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 11-Elevator", async function () {
  const challenge = await getChallenge();
  const factory = await ethers.getContractFactory("ElevatorAttacker");
  const contract = await factory.deploy(await challenge.getAddress());
  await contract.waitForDeployment();

  tx = await contract.attack();
  await tx.wait();

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
