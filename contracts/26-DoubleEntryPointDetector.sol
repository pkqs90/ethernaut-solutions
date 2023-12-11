pragma solidity ^0.8.19;
// SPDX-License-Identifier: MIT
import "hardhat/console.sol";

interface IDetectionBot {
    function handleTransaction(address user, bytes calldata msgData) external;
}

interface IForta {
    function setDetectionBot(address detectionBotAddress) external;
    function notify(address user, bytes calldata msgData) external;
    function raiseAlert(address user) external;
}

contract DoubleEntryPointDetector {
  IForta forta;
  address userAddr;
  address vaultAddr;

  constructor(address _fortaAddr, address _userAddr, address _vaultAddr) {
    forta = IForta(_fortaAddr);
    userAddr = _userAddr;
    vaultAddr = _vaultAddr;
    // console.log(_fortaAddr, _userAddr, _vaultAddr);
  }

  function handleTransaction(address user, bytes calldata msgData) external {
    (address to, uint256 value, address origSender) = abi.decode(msgData[4:], (address, uint256, address));
    // console.log("#handleTransaction", to, value, origSender);
    if (origSender == vaultAddr) {
      forta.raiseAlert(userAddr);
    }
  }

}
