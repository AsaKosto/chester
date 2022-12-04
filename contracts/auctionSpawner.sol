//Auction Spawner
// SPDX-License-Identifier: MIT

import './english.sol';


pragma solidity ^0.8.0;

contract auctionSpawner{

    uint256 public genesis = block.timestamp;
    address public mostRecentListing;
   EnglishAuction public auction;

    function createAuction(uint256 minimumBid, uint256 duration, address payable admin) external returns (EnglishAuction){
        require(duration <= 604800, "Auctions cannot run for more than a week");
        auction = new EnglishAuction(minimumBid, duration, admin);
        // emit auctionCreated(minimumBid, duration, admin);
        // mostRecentListing = address(newAuction);
        // mostRecentListing = auction.getAddress();
        // // address a = address(auction);
        return auction;
    }

    event auctionCreated(uint256 minimumBid, uint256 duration, address payable admin);
}

