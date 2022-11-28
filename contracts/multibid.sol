//Multi-Bid
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MultiBid{

    mapping(address => uint256) public votingPower;
    uint256 public totalVotingPower;

    uint256 ipThirdPartyOptions = 0;
    address[5] public thirdPartyOptions;
    mapping(address => uint256) public thirdParties; //Options for 3rd parties
    mapping(address => bool) public votedThirdParty;

    uint256 ipListingOptions = 0;
    uint256 listingId = 0;
    uint256[5] public listingOptions;
    mapping(uint256 => uint256[]) public listingIds; //maps IDs to listing details
    mapping(uint256 => uint256) public listings; //maps ids to the number of votes
    mapping(address => bool) public votedListings;

    uint256 ipAuctionOptions = 0;
    address[5] public auctionOptions;
    mapping(address => uint256) public auctions; //Options for new auction
    mapping(address => bool) public votedAuctions;

    uint256 public votesToPay;
    uint256 public votesToWithdraw;
    mapping(address => bool) public votedSigPay;
    mapping(address => bool) public votedSigWithdraw;

    address public currentAuction; //The auction this multi-bid is currently bidding on

    constructor(address auction){
        currentAuction = auction;
    }

    //Individual Functions
    function addValue() external payable{
        votingPower[msg.sender] += msg.value;
        totalVotingPower += msg.value;
    }

    function withdrawValue() external{
        require(address(this).balance > 0, "There is currently no ETH stored in this contract. Either the contract is new, or a bid has been submitted");
        require(votingPower[msg.sender] > 0, "You do not have any stake in this contract");
        uint256 callerPower = votingPower[msg.sender];
        //MAKE SURE THIS IS RIGHT
        uint256 ETHToSend = (callerPower * ((address(this).balance * (10 ** 18)) / totalVotingPower)) / (10 ** 18);
        payable(msg.sender).transfer(ETHToSend);
        votingPower[msg.sender] = 0;
    }

    function voteToPay() external{
        require(votedSigPay[msg.sender] == false, "You have already voted to pay");
        require(votedSigWithdraw[msg.sender] == false, "You have already voted to withdraw");
        votesToPay += votingPower[msg.sender];
        votedSigPay[msg.sender] = true;
    }
    function retractVoteToPay() external{
        require(votedSigPay[msg.sender] == true, "You have not yet voted to pay");
        require(votedSigWithdraw[msg.sender] == false, "You have voted to withdraw");
        votesToPay -= votingPower[msg.sender];
        votedSigPay[msg.sender] = false;
    }

    function voteToWithdraw() external{
        require(votedSigWithdraw[msg.sender] == false, "You have already voted to withdraw");
        require(votedSigPay[msg.sender] == false, "You have already voted to pay");
        votesToWithdraw += votingPower[msg.sender];
        votedSigWithdraw[msg.sender] = true;
    }
    function retractVoteToWithdraw() external{
        require(votedSigWithdraw[msg.sender] == true, "You have not yet voted to withdraw");
        require(votedSigPay[msg.sender] == false, "You have voted to pay");
        votesToWithdraw -= votingPower[msg.sender];
        votedSigWithdraw[msg.sender] = false;
    }

    //Third Party management
    function proposeThirdParty(address thirdParty) external{
        //Scenario 1: there have been less than 5 third parties proposed
        //Fill the next available slot with a proposed 3rd party
        if (ipThirdPartyOptions < 4){
            thirdPartyOptions[ipThirdPartyOptions] = thirdParty;
            ipThirdPartyOptions += 1;
        }
        //Scenario 2: there have been 5 third parties proposed, replace the one with the lowest votes
        //If multiple third parties are tied for the lowest number of votes, the first proposal in the array will be replaced
        else{
            //Find the lowest voted proposal
            address lowest = thirdPartyOptions[0];
            uint256 lowestIndex = 0;
            for(uint256 i = 0; i < 5; i++){
                address proposal = thirdPartyOptions[i];
                if(thirdParties[proposal] < thirdParties[lowest]){
                    lowest = proposal;
                    lowestIndex = i;
                }
            }
            //replace it
            thirdPartyOptions[lowestIndex] = thirdParty;
        }
    }
    //Vote or retract votes for a third party
    function voteThirdParty(address thirdParty) external{
        require(votedThirdParty[msg.sender] == false, "You have already voted");
        require(thirdParty != address(0), "You cannot vote for the 0 address");
        require(thirdParty == thirdPartyOptions[0] ||
                thirdParty == thirdPartyOptions[1] ||
                thirdParty == thirdPartyOptions[2] ||
                thirdParty == thirdPartyOptions[3] ||
                thirdParty == thirdPartyOptions[4], "Please vote for a proposed party, or propose this party yourself");
        thirdParties[thirdParty] += votingPower[msg.sender];
        votedThirdParty[msg.sender] = true;
    }

    function retractVoteThirdParty(address thirdParty) external{
        require(votedThirdParty[msg.sender] == true, "You have not voted yet");
        require(thirdParty != address(0), "You cannot use for the 0 address");
        thirdParties[thirdParty] -= votingPower[msg.sender];
        votedThirdParty[msg.sender] = false;
    }

    //See a third party at a certain index in thirdPartyOptions
    //Iterate client-side (indices 0-4)
    function viewThirdPartyAtIndex(uint256 index) external view returns(address){
        return thirdPartyOptions[index];
    }
    
    //Listing Management
    function proposeNewListing(uint256 format, uint256 minPrice, uint256 duration) external{
        uint256[3] memory newListing = [format, minPrice, duration];
        uint256 newListingID = listingId;
        listingIds[newListingID] = newListing; //MAKE SURE THIS MAPS PROPERLY
        //Scenario 1: there have been less than 5 listings proposed
        //Fill the next available slot with a proposed listing
        if(ipListingOptions < 4){
            listingOptions[ipListingOptions] = newListingID;
            ipListingOptions += 1;
        }
        //Scenario 2: there have been 5 listings proposed, replace the one with the lowest votes
        //If multiple listings are tied for the lowest number of votes, the first proposal in the array will be replaced
        else{
            //Find the lowest voted proposal
            uint256 lowest = listingOptions[0];
            uint256 lowestIndex = 0;
            for(uint256 i = 0; i < 5; i++){
                uint256 proposal = listingOptions[i];
                if(listings[proposal] < listings[lowest]){
                    lowest = proposal;
                    lowestIndex = i;
                }
            }
            //Replace it and clear all votes for that proposal
            listingOptions[lowestIndex] = newListingID;
        }
        //Update the ID so the next proposal gets a unique ID
        listingId += 1;
    }

    function voteNewListing(uint256 listingID) external{
        require(votedListings[msg.sender] == false, "You have already voted");
        require(listingID == listingOptions[0] ||
                listingID == listingOptions[1] ||
                listingID == listingOptions[2] ||
                listingID == listingOptions[3] ||
                listingID == listingOptions[4], "Please vote for a proposed listing, or propose a new listing");
        listings[listingID] += votingPower[msg.sender];
        votedListings[msg.sender] = true;
    }

    function retractNewVoteListing(uint256 listingID) external{
        require(votedListings[msg.sender] == true, "You have not yet voted");
        listings[listingID] -= votingPower[msg.sender];
        votedListings[msg.sender] = false;
    }

    //See a listing at a certain index in listingOptions
    //Iterate client-side (indices 0-4)
    function viewListingAtIndex(uint256 index) external view returns(uint256, uint256, uint256){
        uint256 idToAccess = listingOptions[index];
        uint256[] memory details = listingIds[idToAccess]; //MAKE SURE THIS RETURNS PROPERLY
        return(details[0], details[1], details[2]);
    }

    //Auction Management
    function proposeNewAuction(address newAuction) external{
        //Scenario 1: there have been less than 5 auctions proposed
        //Fill the next available slot with a proposed auction
        if (ipAuctionOptions < 4){
            auctionOptions[ipAuctionOptions] = newAuction;
            ipAuctionOptions += 1;
        }
        //Scenario 2: there have been 5 auctions proposed, replace the one with the lowest votes
        //If multiple auctions are tied for the lowest number of votes, the first proposal in the array will be replaced
        else{
            //Find the lowest voted proposal
            address lowest = auctionOptions[0];
            uint256 lowestIndex = 0;
            for(uint256 i = 0; i < 5; i++){
                address proposal = auctionOptions[i];
                if(auctions[proposal] < auctions[lowest]){
                    lowest = proposal;
                    lowestIndex = i;
                }
            }
            //Replace it and clear all votes for that proposal
            auctionOptions[lowestIndex] = newAuction;
        }
    }

    function voteNewAuction(address newAuction) external{
        require(votedAuctions[msg.sender] == false, "You have already voted");
        require(newAuction != address(0), "You cannot vote for the zero address");
        require(newAuction == auctionOptions[0] ||
                newAuction == auctionOptions[1] ||
                newAuction == auctionOptions[2] ||
                newAuction == auctionOptions[3] ||
                newAuction == auctionOptions[4], "Please vote for a proposed auction, or propose this auction yourself");
        auctions[newAuction] += votingPower[msg.sender];
        votedAuctions[msg.sender] = true;
    }

    function retractVoteNewAuction(address newAuction) external{
        require(votedAuctions[msg.sender] == true, "You have not voted yet");
        require(newAuction != address(0), "You cannot use the 0 address");
        auctions[newAuction] -= votingPower[msg.sender];
        votedAuctions[msg.sender] = false;
    }

    //See a third party at a certain index in auctionOptions
    //Iterate client-side (indices 0-4)
    function viewAuctionAtIndex(uint256 index) external view returns(address){
        return auctionOptions[index];
    }

}