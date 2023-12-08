pragma solidity ^0.8.19;
// SPDX-License-Identifier: MIT

interface IMagicNumber {
    function setSolver(address) external;
}

contract MagicNumberAttacker {

  IMagicNumber challenge;

  constructor(address addr) {
    challenge = IMagicNumber(addr);
  }

  // https://medium.com/coinmonks/ethernaut-lvl-19-magicnumber-walkthrough-how-to-deploy-contracts-using-raw-assembly-opcodes-c50edb0f71a2
  function attack() public {
      bytes memory bytecode = hex"600a600c600039600a6000f3602a60005260206000f3";
      bytes32 salt = 0;
      address solver;

      assembly {
          solver := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
      }

      challenge.setSolver(solver);
  }

}
