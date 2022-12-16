//Auction Spawner
// SPDX-License-Identifier: MIT

import './english.sol';

pragma solidity ^0.8.0;

contract auctionSpawner{

    uint256 public genesis = block.timestamp;
    address public mostRecentListing;

    function createAuction(uint256 minimumBid, uint256 duration, address payable admin) external{// returns (address){
        require(admin == msg.sender, "You cannot create auctions where you are not the admin");
        require(duration <= 604800, "Auctions cannot run for more than a week");
        EnglishAuction auction = new EnglishAuction(minimumBid, duration, admin);
        emit auctionCreated(minimumBid, duration, admin, auction);
        mostRecentListing = address(auction);
    }

    function getMostRecentListing() external view returns (address){
        return mostRecentListing;
    }

    event auctionCreated(uint256 minimumBid, uint256 duration, address payable admin, EnglishAuction auction);
}

