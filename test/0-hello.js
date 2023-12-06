const { expect } = require("chai");
const { createChallenge, submitLevel } = require("./utils");

const abi = [
  {
    inputs: [{ internalType: "string", name: "_password", type: "string" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "string", name: "passkey", type: "string" }],
    name: "authenticate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xaa613b29",
  },
  {
    inputs: [],
    name: "getCleared",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x3c848d78",
  },
  {
    inputs: [],
    name: "info",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "pure",
    type: "function",
    constant: true,
    signature: "0x370158ea",
  },
  {
    inputs: [],
    name: "info1",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "pure",
    type: "function",
    constant: true,
    signature: "0xd4c3cf44",
  },
  {
    inputs: [{ internalType: "string", name: "param", type: "string" }],
    name: "info2",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "pure",
    type: "function",
    constant: true,
    signature: "0x2133b6a9",
  },
  {
    inputs: [],
    name: "info42",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "pure",
    type: "function",
    constant: true,
    signature: "0x2cbd79a5",
  },
  {
    inputs: [],
    name: "infoNum",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0xc253aebe",
  },
  {
    inputs: [],
    name: "method7123949",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "pure",
    type: "function",
    constant: true,
    signature: "0xf0bc7081",
  },
  {
    inputs: [],
    name: "password",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x224b610b",
  },
  {
    inputs: [],
    name: "theMethodName",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0xf157a1e3",
  },
];

async function getChallenge() {
  const challengeAddress = await createChallenge(`0x7E0f53981657345B31C59aC44e9c21631Ce710c7`)
  const challenge = await ethers.getContractAt(
    abi,
    challengeAddress,
  );
  return challenge;
}

it("Solves 0-Hello", async function () {
  const challenge = await getChallenge();
  const password = await challenge.password()
  console.log("password:", password);
  tx = await challenge.authenticate(password)
  await tx.wait();
  expect(await submitLevel(await challenge.getAddress())).to.equal(true);
});
