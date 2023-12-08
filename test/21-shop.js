const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("Shop");
  const challengeAddress = await createChallenge(`0x691eeA9286124c043B82997201E805646b76351a`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 21-Shop", async function () {
  const challenge = await getChallenge();

  const factory = await ethers.getContractFactory("ShopAttack");
  const contract = await factory.deploy(await challenge.getAddress());
  await contract.waitForDeployment();

  await contract.attack();

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
