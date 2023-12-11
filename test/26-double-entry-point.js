const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("DoubleEntryPoint");
  const challengeAddress = await createChallenge(`0x34bD06F195756635a10A7018568E033bC15F3FB5`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

// https://blog.dixitaditya.com/ethernaut-level-26-doubleentrypoint
it("Solves 26-DoubleEntryPoint", async function () {
  const doubleEntryPoint = await getChallenge();
  const doubleEntryPointAddress = await doubleEntryPoint.getAddress();

  const vaultAddress = await doubleEntryPoint.cryptoVault();
  const fortaAddress = await doubleEntryPoint.forta();

  const [eoa] = await ethers.getSigners();
  const eoaAddress = await eoa.getAddress();

  const factory = await ethers.getContractFactory("DoubleEntryPointDetector");
  const detectionBot = await factory.deploy(fortaAddress, eoaAddress, vaultAddress);
  await detectionBot.waitForDeployment();

  await eoa.sendTransaction({
    to: fortaAddress,
    data: (await ethers.getContractFactory("Forta")).interface.encodeFunctionData("setDetectionBot", [await detectionBot.getAddress()])
  })

  expect(await submitLevel(doubleEntryPointAddress)).to.equal(true);
});
