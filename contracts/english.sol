//English Auction

pragma solidity ^0.8.0;

import '../libraries/ownable.sol';

contract EnglishAuction is Ownable {

    address payable public admin;
    uint256 public startTime;

    uint256 private highestBid;
    address payable private winner;
    address payable public thirdParty;

    bool private ownerSigWithdraw = false;
    bool private ownerSigPay = false;

    bool private thirdPartySigWithdraw = false;
    bool private thirdPartySigPay = false;

    bool private winnerSigWithdraw = false;
    bool private winnerSigPay = false;

    bool private thirdPartyApproved = false;

    uint256 public minimumBid;
    uint256 public duration;

    //minimumBid in Wei
    //duration of the auction in seconds
    constructor(uint256 _minimumBid, uint256 _duration){
        admin = payable(msg.sender);
        minimumBid = _minimumBid;
        duration = _duration;
        highestBid = _minimumBid;
        startTime = block.timestamp;
    }

    function bid(address payable _thirdParty) external payable {
        require(block.timestamp < (startTime + duration), "This auction has closed");
        require(msg.value > highestBid, "You are not beating the current highest bid");
        //transfer the original bidder their money back
        if (winner != address(0)){
            winner.transfer(highestBid);
        }
        //update the new winner, new 3rd party, and new highest bid
        highestBid = msg.value;
        winner = payable(msg.sender);
        thirdParty = _thirdParty;
    }

    function approveThirdParty() external onlyOwner {
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

    function cashOut() external payable onlyOwner {
        require(block.timestamp > (startTime + duration), "This auction is still open");
        //check for signatures
        require((ownerSigPay && winnerSigPay) || (ownerSigPay && thirdPartySigPay) || (thirdPartySigPay && winnerSigPay), "This transaction has not been approved by the required parties");
        //cash out
        admin.transfer(highestBid);
        //TODO: pay third party 
    }

    function withdrawBid() external payable {
        require(block.timestamp > (startTime + duration), "This auction is still open");
        //check for signatures
        require((ownerSigWithdraw && winnerSigWithdraw) || (ownerSigWithdraw && thirdPartySigWithdraw) || (thirdPartySigWithdraw && winnerSigWithdraw), "This transaction has not been approved by the required parties");
        //withdraw bid
        winner.transfer(highestBid);
        //TODO: pay third party
    }

    function currentHighestBid() public view returns(uint256){
        return highestBid;
    }

}
