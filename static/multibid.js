 // sets up web3.js
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

// =============================================================================
//         ABIs and Contract Addresses: Paste Your ABIs/Addresses Here
// =============================================================================


const english_abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_minimumBid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_duration",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "_admin",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "approveThirdParty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_thirdParty",
				"type": "address"
			}
		],
		"name": "bid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cashOut",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentHighestBid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "duration",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "highestBid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minimumBid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ownerSigPay",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ownerSigWithdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "signToPay",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "signToWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "thirdParty",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "thirdPartyApproved",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "thirdPartySigPay",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "thirdPartySigWithdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winnerSigPay",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winnerSigWithdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawBid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
];

//const multibid_address = '0x55C4E044be44Cb7E89cFD39e979FFe3D71D8F18A'
const multibid_abi =  [
	{
		"inputs": [],
		"name": "addValue",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "format",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			}
		],
		"name": "proposeNewListing",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "thirdParty",
				"type": "address"
			}
		],
		"name": "proposeThirdParty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "listingID",
				"type": "uint256"
			}
		],
		"name": "retractNewVoteListing",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "retractVoteApproveSubmittedThirdParty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "thirdParty",
				"type": "address"
			}
		],
		"name": "retractVoteThirdParty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "retractVoteToPay",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "retractVoteToWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "submitApprovalThirdParty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "thirdParty",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "submitBid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "submitCashOut",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "submitSigPay",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "submitSigWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "submitWithdrawBid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "auction",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "voteApproveSubmittedThirdParty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "listingID",
				"type": "uint256"
			}
		],
		"name": "voteNewListing",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "thirdParty",
				"type": "address"
			}
		],
		"name": "voteThirdParty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "voteToPay",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "voteToWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawValue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "_currentAuction",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listingIds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listingOptions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "seeMyStake",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "thirdParties",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "thirdPartyOptions",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalVotingPower",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "viewListingAtIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "viewThirdPartyAtIndex",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "votedApprove",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "votedListings",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "votedSigPay",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "votedSigWithdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "votedThirdParty",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "votesToPay",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "votesToWithdraw",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "votingPower",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// const set_address = '';
//var multibid_address = 0;
var multibid_contract = 0;
var owner_address = 0;


async function update_balance(address){
	web3.eth.getBalance(address, function(err, result){
		if (err){
			console.log(err)
		} else {
			let b = web3.utils.fromWei(result, "ether")
			$("#account-balance").html("Balance: " + b + " ETH");
		}
	});
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
//BUTTON VISIBILITY CONTROL
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

function hide_buttons(){
	//Voting
	document.getElementById('voteToPay').style.visibility='hidden';
	document.getElementById('retractVoteToPay').style.visibility='hidden';
	document.getElementById('voteToWithdraw').style.visibility='hidden';
	document.getElementById('retractVoteToWithdraw').style.visibility='hidden';
	//Signatures
	document.getElementById('signToPay').style.visibility='hidden';
	document.getElementById('signToWithdraw').style.visibility='hidden';
	document.getElementById('withdrawBid').style.visibility='hidden';
	//Third Party Management
	document.getElementById('third-address-proposal').style.visibility='hidden';
	document.getElementById('proposeThirdParty').style.visibility='hidden';
	//
	document.getElementById('third-address-vote').style.visibility='hidden';
	document.getElementById('voteThirdParty').style.visibility='hidden';
	//
	document.getElementById('third-address-retract').style.visibility='hidden';
	document.getElementById('retractVoteThirdParty').style.visibility='hidden';
	//Re-Listing Options
	document.getElementById('new-listing-minPrice').style.visibility='hidden';
	document.getElementById('new-listing-duration').style.visibility='hidden';
	document.getElementById('proposeNewListing').style.visibility='hidden';
	//
	document.getElementById('vote-listing-id').style.visibility='hidden';
	document.getElementById('voteNewListing').style.visibility='hidden';
	//
	document.getElementById('retract-listing-id').style.visibility='hidden';
	document.getElementById('retractNewVoteListing').style.visibility='hidden';
	//
	document.getElementById('final-listing-id').style.visibility='hidden';
	document.getElementById('reList').style.visibility='hidden';
	//
	document.getElementById('voteApproveSubmittedThirdParty').style.visibility='hidden';
	document.getElementById('retractVoteApproveSubmittedThirdParty').style.visibility='hidden';
	document.getElementById('approveSubmittedThirdParty').style.visibility='hidden';
	document.getElementById('cashOut').style.visibility='hidden';
}

async function show_win_vote_buttons(){
	web3.eth.defaultAccount = $("#myaccount").val();
	address = web3.eth.defaultAccount;
	let votedPay = await multibid_contract.methods.votedSigPay(address).call({address});
	let votedWithdraw = await multibid_contract.methods.votedSigWithdraw(address).call({address});
	if(!votedPay && !votedWithdraw){
		document.getElementById('voteToPay').style.visibility='visible';
		document.getElementById('voteToWithdraw').style.visibility='visible';
		document.getElementById('retractVoteToPay').style.visibility='hidden';
		document.getElementById('retractVoteToWithdraw').style.visibility='hidden';
	}
	if(votedPay){
		document.getElementById('voteToPay').style.visibility='hidden';
		document.getElementById('voteToWithdraw').style.visibility='hidden';
		document.getElementById('retractVoteToPay').style.visibility='visible';
		document.getElementById('retractVoteToWithdraw').style.visibility='hidden';
	}
	if(votedWithdraw){
		document.getElementById('voteToPay').style.visibility='hidden';
		document.getElementById('voteToWithdraw').style.visibility='hidden';
		document.getElementById('retractVoteToPay').style.visibility='hidden';
		document.getElementById('retractVoteToWithdraw').style.visibility='visible';
	}
}

async function show_third_party_mgmt(){
	address = web3.eth.defaultAccount;
	time_left = await get_time_left();
	if(time_left > 0){
		document.getElementById('third-address-proposal').style.visibility='visible';
		document.getElementById('proposeThirdParty').style.visibility='visible';
		let voted = await multibid_contract.methods.votedThirdParty(address).call({address});
		if(voted){
			document.getElementById('third-address-vote').style.visibility='hidden';
			document.getElementById('voteThirdParty').style.visibility='hidden';
			document.getElementById('third-address-retract').style.visibility='visible';
			document.getElementById('retractVoteThirdParty').style.visibility='visible';
		}
		else{
			document.getElementById('third-address-vote').style.visibility='visible';
			document.getElementById('voteThirdParty').style.visibility='visible';
			document.getElementById('third-address-retract').style.visibility='hidden';
			document.getElementById('retractVoteThirdParty').style.visibility='hidden';
		}
	}
	else{
		document.getElementById('third-address-proposal').style.visibility='hidden';
		document.getElementById('proposeThirdParty').style.visibility='hidden';
		document.getElementById('third-address-vote').style.visibility='hidden';
		document.getElementById('voteThirdParty').style.visibility='hidden';
		document.getElementById('third-address-retract').style.visibility='hidden';
		document.getElementById('retractVoteThirdParty').style.visibility='hidden';
	}
}

async function show_win_sig_buttons(){
	time_left        = await get_time_left();
	//vote info
	votesSigPay      = await multibid_contract.methods.votesToPay().call({from:web3.eth.defaultAccount});
	votesSigWithdraw = await multibid_contract.methods.votesToWithdraw().call({from:web3.eth.defaultAccount});
	totalVotingPower = await multibid_contract.methods.totalVotingPower().call({from:web3.eth.defaultAccount});
	//sig info
	let winnerSig        = await english_contract.methods.winnerSigWithdraw().call({from:web3.eth.defaultAccount});
	let ownerSig         = await english_contract.methods.ownerSigWithdraw().call({from:web3.eth.defaultAccount});
	let thirdPartySig    = await english_contract.methods.thirdPartySigWithdraw().call({from:web3.eth.defaultAccount});
	if(time_left <= 0 && (2 * votesSigPay > totalVotingPower)){
		document.getElementById('signToPay').style.visibility='visible';
		document.getElementById('signToWithdraw').style.visibility='hidden';
		document.getElementById('withdrawBid').style.visibility='hidden';
	}
	if(time_left <= 0 && (2 * votesSigWithdraw > totalVotingPower)){
		document.getElementById('signToPay').style.visibility='hidden';
		document.getElementById('signToWithdraw').style.visibility='visible';
		document.getElementById('withdrawBid').style.visibility='hidden';
	}
	if(time_left < 0 && ((winnerSig&&ownerSig) || (winnerSig&&thirdPartySig) || (thirdPartySig&&ownerSig))){
		document.getElementById('signToPay').style.visibility='hidden';
		document.getElementById('signToWithdraw').style.visibility='hidden';
		document.getElementById('withdrawBid').style.visibility='visible';
	}
}

async function show_relist_buttons(){
	let time_left = await get_time_left();
	let winner    = await english_contract.methods.winner().call({from:web3.eth.defaultAccount});
	let balance   = await web3.eth.getBalance(auction_address);
	if(time_left <= 0 && (winner == multibid_address) && balance == 0){ //check that the auction is over, the multibid has won, and the owner has cashed out (maybe check signatures instead)?
		document.getElementById('final-listing-id').style.visibility='visible';
		document.getElementById('reList').style.visibility='visible';
		document.getElementById('3p-0').style.visibility='hidden';
		document.getElementById('3p-1').style.visibility='hidden';
		document.getElementById('3p-2').style.visibility='hidden';
		document.getElementById('3p-3').style.visibility='hidden';
		document.getElementById('3p-4').style.visibility='hidden';
		let voted = await multibid_contract.methods.votedListings(web3.eth.defaultAccount).call({from:web3.eth.defaultAccount});
		if(!voted){
			document.getElementById('new-listing-minPrice').style.visibility='visible';
			document.getElementById('new-listing-duration').style.visibility='visible';
			document.getElementById('proposeNewListing').style.visibility='visible';
			document.getElementById('vote-listing-id').style.visibility='visible';
			document.getElementById('voteNewListing').style.visibility='visible';
			document.getElementById('retract-listing-id').style.visibility='hidden';
			document.getElementById('retractNewVoteListing').style.visibility='hidden';
		}
		if(voted){
			document.getElementById('new-listing-minPrice').style.visibility='visible';
			document.getElementById('new-listing-duration').style.visibility='visible';
			document.getElementById('proposeNewListing').style.visibility='visible';
			document.getElementById('vote-listing-id').style.visibility='hidden';
			document.getElementById('voteNewListing').style.visibility='hidden';
			document.getElementById('retract-listing-id').style.visibility='visible';
			document.getElementById('retractNewVoteListing').style.visibility='visible';
		}
	}

}

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
//END BUTTON VISIBILITY CONTROL
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

async function update_info(){
	address = $("#myaccount").val();
	update_balance(address);
	get_auction_info();
	get_multibid_info();
	get_thirdParty_proposals();
	//buttons control
	show_win_sig_buttons();
	show_third_party_mgmt();
	show_relist_buttons();
	get_listing_proposals();
}

async function get_time_left(){
	auction_address = await multibid_contract.methods._currentAuction().call({from:web3.eth.defaultAccount});
	english_contract = new web3.eth.Contract(english_abi, auction_address);
	let duration = await english_contract.methods.duration().call({from:web3.eth.defaultAccount});
    let begin = await english_contract.methods.startTime().call({from:web3.eth.defaultAccount});
    const d = new Date();
    let time = Math.floor(d.getTime()/ 1000);
    let time_passed = time - begin;
    let time_left = duration - time_passed;
	return time_left;
}

async function get_auction_info(){
	auction_address = await multibid_contract.methods._currentAuction().call({from:web3.eth.defaultAccount});
	//console.log(auction_address);
	$("#auction-address").html(auction_address);
	english_contract = new web3.eth.Contract(english_abi, auction_address);
	let name = await english_contract.methods.name().call({from:web3.eth.defaultAccount});
	$("#name").html("Item: " + name);
	curr_highest_bid = await english_contract.methods.highestBid().call({from:web3.eth.defaultAccount});
	$("#curr-high-bid").html(curr_highest_bid * 10**(-18) + " ETH");
	winner = await english_contract.methods.winner().call({from:web3.eth.defaultAccount});
	$("#winner").html(winner);
	let duration = await english_contract.methods.duration().call({from:web3.eth.defaultAccount});
    let begin = await english_contract.methods.startTime().call({from:web3.eth.defaultAccount});
    const d = new Date();
    let time = Math.floor(d.getTime()/ 1000);
    let time_passed = time - begin;
    let time_left = duration - time_passed;
	hours = Math.floor(time_left/(60*60))
	minutes = Math.floor((time_left % (60*60)) / 60)
    if (time_left < 0){
       $("#duration").html(0);
	   show_win_vote_buttons();
    } else {
       $("#duration").html(hours + "H " + minutes + "M");
    }
}

async function get_multibid_info(){
	web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
	multibid_balance = await web3.eth.getBalance(multibid_address);
	//console.log(multibid_balance);
	$("#multibid-balance").html("Multibid Contract Balance: "+multibid_balance+" Wei");
	stake = await multibid_contract.methods.seeMyStake().call({from:web3.eth.defaultAccount});
	totalVotingPower = await multibid_contract.methods.totalVotingPower().call({from:web3.eth.defaultAccount})
	percent_ownership = stake/totalVotingPower*100;
	$("#stake").html("Stake: "+percent_ownership+"%");
}

async function get_listing_proposals(){
	web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
	for(let i = 0; i<5; i++){
		res = await multibid_contract.methods.viewListingAtIndex(i).call({from:web3.eth.defaultAccount});
		id = res[0];
		min_bid = res[1];
		duration=res[2];
		votes = res[3];
		totalVotingPower = await multibid_contract.methods.totalVotingPower().call({from:web3.eth.defaultAccount});
		percentOfVote = votes/totalVotingPower*100;
		elt_id = "#listing-info-"+i;
		$(elt_id).html("id: "+ id +" Minimum Bid: "+ min_bid +" duration: "+ duration +" Vote %: "+ percentOfVote);
	}
}

async function get_thirdParty_proposals(){
	web3.eth.defaultAccount = $("#myaccount").val();
	console.log(web3.eth.defaultAccount);
	for(let i = 0; i<5; i++){
		res = await multibid_contract.methods.viewThirdPartyAtIndex(i).call({from:web3.eth.defaultAccount});
		thirdParty = res[0];
		if (thirdParty != '0x0000000000000000000000000000000000000000')
		{
			votes = res[1];
			totalVotingPower = await multibid_contract.methods.totalVotingPower().call({from:web3.eth.defaultAccount});
			percentOfVote = votes/totalVotingPower*100;
			if(totalVotingPower == 0){percentOfVote = 0;}
			elt_id = "#3p-"+i;
			//console.log(elt_id, thirdParty, percentOfVote);
			$(elt_id).html("address:"+thirdParty+" Vote %: "+ percentOfVote);
		}
	}
}

$(document).ready(function(){
	let params = new URLSearchParams(window.location.search),
		first = params.get("address");
	if (first != null){
		multibid_address = first;
		multibid_contract = new web3.eth.Contract(multibid_abi, multibid_address);       	
	} else {
		multibid_address = set_address;
		multibid_contract = new web3.eth.Contract(multibid_abi, multibid_address);        	
	}

	web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
	multibid_contract = new web3.eth.Contract(multibid_abi, multibid_address);
	// get_multibid_info();
	// get_auction_info();
	//buttons control
	hide_buttons();
	update_info();

	web3.eth.getAccounts().then((response)=> {
		web3.eth.defaultAccount = response[0];
		update_balance(response[0]);
	});
	// Allows switching between accounts in 'My Account'
	web3.eth.getAccounts().then((response)=>{
		var opts = response.map(function (a) { return '<option value="'+
				a.toLowerCase()+'">'+a.toLowerCase()+'</option>' });
		$(".account").html(opts);
		web3.eth.defaultAccount = $("#myaccount").val();
	});

	var denominations = {
		Ether : 'Ether',
		Finny : 'Finney',
		Gwei : 'Gwei',
		Wei : 'Wei'
	};
	
	var select = document.getElementById("units");
	for(index in denominations) {
		select.options[select.options.length] = new Option(denominations[index], index);
	}

	var select = document.getElementById("units2");
	for(index in denominations) {
		select.options[select.options.length] = new Option(denominations[index], index);
	}

	$("#submit-bid").click(async function() {
		
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		let third_address = $("#third-address").val()
		if (duration == 0){
			alert("This auction is over!")
		} else if (web3.eth.defaultAccount.toLocaleLowerCase() == third_address.toLocaleLowerCase()) {
			alert("You cannot name yourself as the third party!")
		} else {
			let unit = $("#units").val();
			//alert(unit)
			if (unit == "Ether") {
				scale = 10**(18)
			} else if (unit == "Finney") {
				scale = 10**(15)
			} else if (unit == "Gwei") {
				scale = 10**(9)
			} else {
				scale = 1
			}
			amount = $("#bid").val() * scale;
			await multibid_contract.methods.submitBid($("#third-address").val(), web3.utils.toBN(amount)).send({from:web3.eth.defaultAccount})
			update_balance($("#myaccount").val());
			update_info();
		}
	})



	$("#addValue").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		let unit = $("#units2").val();
		//alert(unit);
		if (unit == "Ether") {
			scale = 10**(18)
		} else if (unit == "Finney") {
			scale = 10**(15)
		} else if (unit == "Gwei") {
			scale = 10**(9)
		} else {
			scale = 1
		}
		amount = $("#valueToAdd").val() * scale;
		await multibid_contract.methods.addValue().send({from:web3.eth.defaultAccount, value:amount});
		update_info()
	})


	$("#withdrawValue").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		await multibid_contract.methods.withdrawValue().send({from:web3.eth.defaultAccount});
		update_info()
	})

	$("#voteToPay").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		await multibid_contract.methods.voteToPay().send({from:web3.eth.defaultAccount});
		update_info()
	})

	$("#retractVoteToPay").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		await multibid_contract.methods.retractVoteToPay().send({from:web3.eth.defaultAccount});
		update_info()
	})

	$("#voteToWithdraw").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		await multibid_contract.methods.voteToWithdraw().send({from:web3.eth.defaultAccount});
		update_info()
	})

	$("#retractVoteToWithdraw").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		await multibid_contract.methods.retractVoteToWithdraw().send({from:web3.eth.defaultAccount, gas:500000});
		update_info()
	})

	$("#signToPay").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val();
		await multibid_contract.methods.submitSigPay().send({from:web3.eth.defaultAccount});
		update_info()
	})

	$("#signToWithdraw").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val();
		await multibid_contract.methods.submitSigWithdraw().send({from:web3.eth.defaultAccount});
		update_info()
	})

	$("#withdrawBid").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val();
		await multibid_contract.methods.submitWithdrawBid().send({from:web3.eth.defaultAccount});
		update_info()
	})
	
	$("#proposeThirdParty").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		third_party_prop = $("#third-address-proposal").val()
		await multibid_contract.methods.proposeThirdParty(third_party_prop).send({from:web3.eth.defaultAccount});
		update_info()
	})

	$("#voteThirdParty").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		third_party_vote = $("#third-address-vote").val()
		await multibid_contract.methods.voteThirdParty(third_party_vote).send({from:web3.eth.defaultAccount});
		update_info()
	})

	$("#retractVoteThirdParty").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		third_party_retract = $("#third-address-retract").val()
		await multibid_contract.methods.retractVoteThirdParty(third_party_retract).send({from:web3.eth.defaultAccount});
		update_info()
	})

	$("#proposeNewListing").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		min_price = $("#new-listing-minPrice").val();
		duration = $("#new-listing-duration").val();
		//console.log(min_price,duration)
		await multibid_contract.methods.proposeNewListing(0, min_price, duration).send({from:web3.eth.defaultAccount, gasLimit: 500000});
		update_info()
	})

	$("#voteNewListing").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		listing_id = $("#vote-listing-id").val()
		await multibid_contract.methods.voteNewListing(listing_id).send({from:web3.eth.defaultAccount});
		update_info()
	})

	$("#retractNewVoteListing").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		listing_id = $("#retract-listing-id").val()
		//console.log(listing_id)
		await multibid_contract.methods.retractNewVoteListing(listing_id).send({from:web3.eth.defaultAccount});
		update_info()
	})

	$("#voteApproveSubmittedThirdParty").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		await multibid_contract.methods.voteApproveSubmittedThirdParty().send({from:web3.eth.defaultAccount});
		update_info()
	})

	$("#retractVoteApproveSubmittedThirdParty").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		await multibid_contract.methods.retractVoteApproveSubmittedThirdParty().send({from:web3.eth.defaultAccount});
		update_info()
	})

})