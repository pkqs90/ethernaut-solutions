const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("MagicNum");
  const challengeAddress = await createChallenge(`0x2132C7bc11De7A90B87375f282d36100a29f97a9`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

// Solving this challenge requires knowledge on raw assembly opcodes:
// https://medium.com/coinmonks/ethernaut-lvl-19-magicnumber-walkthrough-how-to-deploy-contracts-using-raw-assembly-opcodes-c50edb0f71a2

it("Solves 18-MagicNum", async function () {
  const challenge = await getChallenge();

  const factory = await ethers.getContractFactory("MagicNumberAttacker");
  const contract = await factory.deploy(await challenge.getAddress());
  await contract.waitForDeployment();

  await contract.attack();

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
