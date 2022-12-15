//Multi-Bid
// SPDX-License-Identifier: MIT

import '../interfaces/englishInterface.sol';

pragma solidity ^0.8.0;

contract MultiBid{

    mapping(address => uint256) public votingPower;
    uint256 public totalVotingPower;

    uint256 ipThirdPartyOptions = 0;
    address[5] public thirdPartyOptions;
    mapping(address => uint256) public thirdParties; //Options for 3rd parties
    mapping(address => bool) public votedThirdParty;

    uint256 ipListingOptions = 0;
    uint256 listingId = 1;
    uint256[5] public listingOptions;
    mapping(uint256 => uint256[]) public listingIds; //maps IDs to listing details
    mapping(uint256 => uint256) public listings; //maps ids to the number of votes
    mapping(address => bool) public votedListings;

    uint256 public votesToPay;
    uint256 public votesToWithdraw;
    mapping(address => bool) public votedSigPay;
    mapping(address => bool) public votedSigWithdraw;

    uint256 votesApproveSubmittedThirdParty;
    mapping(address => bool) public votedApprove;

    address public _currentAuction; //The auction this multi-bid is currently bidding on
    //EnglishInterface public currentAuction;

    constructor(address auction){
        _currentAuction = auction;
        //EnglishInterface currentAuction = EnglishInterface(_currentAuction);
    }
    //********************************************************************************\\
    //Individual Functions
    //********************************************************************************\\

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
        totalVotingPower -= votingPower[msg.sender];
        votingPower[msg.sender] = 0;
    }

    function voteToPay() external{
        require(votingPower[msg.sender] > 0, "You do not have any stake in this multi-bid, please add value if you wish to be able to perform this action");
        require(votedSigPay[msg.sender] == false, "You have already voted to pay");
        require(votedSigWithdraw[msg.sender] == false, "You have already voted to withdraw");
        votesToPay += votingPower[msg.sender];
        votedSigPay[msg.sender] = true;
    }
    function retractVoteToPay() external{
        require(votingPower[msg.sender] > 0, "You do not have any stake in this multi-bid, please add value if you wish to be able to perform this action");
        require(votedSigPay[msg.sender] == true, "You have not yet voted to pay");
        require(votedSigWithdraw[msg.sender] == false, "You have voted to withdraw");
        votesToPay -= votingPower[msg.sender];
        votedSigPay[msg.sender] = false;
    }

    function voteToWithdraw() external{
        require(votingPower[msg.sender] > 0, "You do not have any stake in this multi-bid, please add value if you wish to be able to perform this action");
        require(votedSigWithdraw[msg.sender] == false, "You have already voted to withdraw");
        require(votedSigPay[msg.sender] == false, "You have already voted to pay");
        votesToWithdraw += votingPower[msg.sender];
        votedSigWithdraw[msg.sender] = true;
    }
    function retractVoteToWithdraw() external{
        require(votingPower[msg.sender] > 0, "You do not have any stake in this multi-bid, please add value if you wish to be able to perform this action");
        require(votedSigWithdraw[msg.sender] == true, "You have not yet voted to withdraw");
        require(votedSigPay[msg.sender] == false, "You have voted to pay");
        votesToWithdraw -= votingPower[msg.sender];
        votedSigWithdraw[msg.sender] = false;
    }

    //Third Party management for submitting bids
    function proposeThirdParty(address thirdParty) external{
        require(votingPower[msg.sender] > 0, "You do not have any stake in this multi-bid, please add value if you wish to be able to perform this action");
        require(thirdParty != msg.sender, "You cannot propose yourself as a third party");
        require(thirdParty != thirdPartyOptions[0] &&
                thirdParty != thirdPartyOptions[1] &&
                thirdParty != thirdPartyOptions[2] &&
                thirdParty != thirdPartyOptions[3] &&
                thirdParty != thirdPartyOptions[4], "This party has already been proposed");
        //Scenario 1: there have been less than 5 third parties proposed
        //Fill the next available slot with a proposed 3rd party
        if (ipThirdPartyOptions < 5){
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
    //Vote or retract votes for a third party for a bid
    function voteThirdParty(address thirdParty) external{
        require(votingPower[msg.sender] > 0, "You do not have any stake in this multi-bid, please add value if you wish to be able to perform this action");
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
        require(votingPower[msg.sender] > 0, "You do not have any stake in this multi-bid, please add value if you wish to be able to perform this action");
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
        require(votingPower[msg.sender] > 0, "You do not have any stake in this multi-bid, please add value if you wish to be able to perform this action");
        uint256[3] memory newListing = [format, minPrice, duration];
        uint256 newListingID = listingId;
        listingIds[newListingID] = newListing; //MAKE SURE THIS MAPS PROPERLY
        //Scenario 1: there have been less than 5 listings proposed
        //Fill the next available slot with a proposed listing
        if(ipListingOptions < 5){
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
        require(votingPower[msg.sender] > 0, "You do not have any stake in this multi-bid, please add value if you wish to be able to perform this action");
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
        require(votingPower[msg.sender] > 0, "You do not have any stake in this multi-bid, please add value if you wish to be able to perform this action");
        require(votedListings[msg.sender] == true, "You have not yet voted");
        listings[listingID] -= votingPower[msg.sender];
        votedListings[msg.sender] = false;
    }

    //See a listing at a certain index in listingOptions
    //Iterate client-side (indices 0-4)
    function viewListingAtIndex(uint256 index) external view returns(uint256, uint256, uint256, uint256){
        uint256 idToAccess = listingOptions[index];
        uint256[] memory details = listingIds[idToAccess]; //MAKE SURE THIS RETURNS PROPERLY
        return(idToAccess, details[1], details[2], listings[idToAccess]);
    }

    //Approving submitted third party in a winning bid
    function voteApproveSubmittedThirdParty() external{
        require(votingPower[msg.sender] > 0, "You do not have any stake in this multi-bid, please add value if you wish to be able to perform this action");
        require(votedApprove[msg.sender] == false, "You have already voted");
        votesApproveSubmittedThirdParty += votingPower[msg.sender];
        votedApprove[msg.sender] = true;
    }

    function retractVoteApproveSubmittedThirdParty() external{
        require(votingPower[msg.sender] > 0, "You do not have any stake in this multi-bid, please add value if you wish to be able to perform this action");
        require(votedApprove[msg.sender] == true, "You have not voted yet");
        votesApproveSubmittedThirdParty -= votingPower[msg.sender];
        votedApprove[msg.sender] = false;
    }

    function seeMyStake() external view returns(uint256){
        return(votingPower[msg.sender]);
    }

    //********************************************************************************\\
    //Contract functions
    //********************************************************************************\\

    function submitBid(address thirdParty, uint256 amount) external payable{
        require(votingPower[msg.sender] > 0, "You do not have any stake in this multi-bid, please add value if you wish to be able to perform this action");
        require(amount <= address(this).balance, "There is not enough ETH in this multi-bid, please add more value");
        require((2 * thirdParties[thirdParty]) > totalVotingPower, "This third party does not currently have enough votes");
        EnglishInterface currentAuction = EnglishInterface(_currentAuction);
        currentAuction.bid{value: amount}(payable(thirdParty));
    }

    function submitSigPay() external{
        require(votingPower[msg.sender] > 0, "You do not have any stake in this multi-bid, please add value if you wish to be able to perform this action");
        require((2 * votesToPay) > totalVotingPower, "There are not currently enough votes to submit a 'pay' signature");
        EnglishInterface currentAuction = EnglishInterface(_currentAuction);
        currentAuction.signToPay();
    }

    function submitSigWithdraw() external{
        require(votingPower[msg.sender] > 0, "You do not have any stake in this multi-bid, please add value if you wish to be able to perform this action");
        require((2 * votesToWithdraw) > totalVotingPower, "There are not currently enough votes to submit a 'withdraw' signature");
        EnglishInterface currentAuction = EnglishInterface(_currentAuction);
        currentAuction.signToWithdraw();
    }

    function submitCashOut() external{
        require(votingPower[msg.sender] > 0, "You do not have any stake in this multi-bid, please add value if you wish to be able to perform this action");
        EnglishInterface currentAuction = EnglishInterface(_currentAuction);
        currentAuction.cashOut();
    }

    function submitApprovalThirdParty() external{
        require(votingPower[msg.sender] > 0, "You do not have any stake in this multi-bid, please add value if you wish to be able to perform this action");
        require((2 * votesApproveSubmittedThirdParty) > totalVotingPower, "There are not currently enough votes to approve the proposed third party");
        EnglishInterface currentAuction = EnglishInterface(_currentAuction);
        currentAuction.approveThirdParty();
    }

    function submitWithdrawBid() external{
        require(votingPower[msg.sender] > 0, "You do not have any stake in this multi-bid, please add value if you wish to be able to perform this action");
        require((2 * votesToWithdraw) > totalVotingPower, "There are not currently enough votes to submit a withdrawal request");
        EnglishInterface currentAuction = EnglishInterface(_currentAuction);
        currentAuction.withdrawBid();
    }

    //Recieve
    receive() external payable{}

}