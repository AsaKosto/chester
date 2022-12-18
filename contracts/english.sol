//English Auction
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract EnglishAuction{

    address payable public admin;
    uint256 public startTime;

    uint256 public highestBid;
    address payable public winner; 
    address payable public thirdParty;

    bool public ownerSigWithdraw = false;
    bool public ownerSigPay = false;

    bool public thirdPartySigWithdraw = false;
    bool public thirdPartySigPay = false;

    bool public winnerSigWithdraw = false;
    bool public winnerSigPay = false;

    bool public thirdPartyApproved = false;

    uint256 public minimumBid;
    uint256 public duration;
    string public name;

    //minimumBid in Wei
    //duration of the auction in seconds
    constructor(uint256 _minimumBid, uint256 _duration, address payable _admin, string memory _name){
        require(_duration <= 604800, "Auctions cannot run for more than a week");
        admin = _admin;
        minimumBid = _minimumBid;
        duration = _duration;
        highestBid = _minimumBid;
        name = _name;
        startTime = block.timestamp;
    }

    function bid(address payable _thirdParty) external payable {
        require(msg.sender != admin, "You cannot bid on your own auction");
        require(block.timestamp < (startTime + duration), "This auction has closed");
        require(msg.value > highestBid, "You are not beating the current highest bid");
        require(_thirdParty != payable(msg.sender), "You cannot name yourself as a third party");
        //transfer the original bidder their money back
        if (winner != address(0)){
            winner.transfer(highestBid);
        }
        //update the new winner, new 3rd party, and new highest bid
        highestBid = msg.value;
        winner = payable(msg.sender);
        thirdParty = _thirdParty;
    }

    function approveThirdParty() external {
        require(msg.sender == admin, "You are not authorized to approve this third party");
        require(block.timestamp > (startTime + duration), "This auction is still open");
        thirdPartyApproved = true;
    }

    function signToPay() external {
        require(block.timestamp > (startTime + duration), "This auction is still open");
        if (msg.sender == admin) {ownerSigPay = true;}
        if (msg.sender == thirdParty && thirdPartyApproved) {thirdPartySigPay = true;}
        if (msg.sender == winner) {winnerSigPay = true;}
    }

    function signToWithdraw() external {
        require(block.timestamp > (startTime + duration), "This auction is still open");
        if (msg.sender == admin) {ownerSigWithdraw = true;}
        if (msg.sender == thirdParty && thirdPartyApproved) {thirdPartySigWithdraw = true;}
        if (msg.sender == winner) {winnerSigWithdraw = true;}
    }

    function cashOut() external payable {
        require(msg.sender == admin, "You are not authorized to cash out");
        require(block.timestamp > (startTime + duration), "This auction is still open");
        //check for signatures
        require((ownerSigPay && winnerSigPay) || (ownerSigPay && thirdPartySigPay) || (thirdPartySigPay && winnerSigPay), "This transaction has not been approved by the required parties");
        //cash out
        admin.transfer(highestBid);
        //TODO: pay third party 
    }

    function withdrawBid() external payable {
        require(msg.sender == winner, "You are not authorized to withdraw this bid");
        require(block.timestamp > (startTime + duration), "This auction is still open");
        //check for signatures
        require((ownerSigWithdraw && winnerSigWithdraw) || (ownerSigWithdraw && thirdPartySigWithdraw) || (thirdPartySigWithdraw && winnerSigWithdraw), "This transaction has not been approved by the required parties");
        //withdraw bid
        winner.transfer(highestBid);
        //TODO: pay third party
    }

    function currentHighestBid() external view returns(uint256){
        return highestBid;
    }

    function getAdmin() external view returns(address){
        return admin;
    }

    function endAuction() external {
        require(msg.sender == admin, "You are not authorized to end this auction");
        duration = 0;
    }

}