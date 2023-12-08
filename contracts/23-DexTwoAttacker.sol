pragma solidity ^0.8.19;
// SPDX-License-Identifier: MIT

import "openzeppelin-contracts-08/token/ERC20/IERC20.sol";
import "openzeppelin-contracts-08/token/ERC20/ERC20.sol";

contract DexTwoAttackerToken is ERC20 {
  constructor(string memory name, string memory symbol, uint initialSupply) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
  }

  function approve(address owner, address spender, uint256 amount) public {
    super._approve(owner, spender, amount);
  }
}