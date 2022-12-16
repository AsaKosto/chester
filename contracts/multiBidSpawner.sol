//Multi-Bid Spawner
// SPDX-License-Identifier: MIT

import './multibid.sol';


pragma solidity ^0.8.0;

contract multiBidSpawner{

    uint256 public genesis = block.timestamp;
    address public mostRecentMultiBid;

    function createMultiBid(address auction) external {
        MultiBid newMultiBid = new MultiBid(auction);
        emit multiBidCreated(auction);
        mostRecentMultiBid = address(newMultiBid);
    }

    function getMostRecentMultiBid() external view returns (address) {
        return mostRecentMultiBid;
    }

    event multiBidCreated(address auction);
}
