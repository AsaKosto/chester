//English Interface
// SPDX-License-Identifier: MIT

import '../libraries/ownable.sol';

pragma solidity ^0.8.0;

interface EnglishInterface{
    function bid(address payable _thirdParty) external payable;

    function approveThirdParty() external;
    
    function signToPay() external;

    function signToWithdraw() external;

    function cashOut() external payable;

    function withdrawBid() external payable;

    function currentHighestBid() external view returns(uint256);

    function getAdmin() external view returns(address);

    function endAuction() external;

}