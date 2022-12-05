 // sets up web3.js
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

// =============================================================================
//         ABIs and Contract Addresses: Paste Your ABIs/Addresses Here
// =============================================================================

///THESE ARE HARDCODED FOR NOW
// const english_address = '0xBd1945E5e7f0Db91dcFbb4b48813b11694D3e008';
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
		"name": "withdrawBid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
];
const multibid_address = '0x8f8955E7eea999228558219A8524cE9d7e064caB'
const multibid_abi =  [
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "auctionOptions",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "auctions",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "newAuction",
				"type": "address"
			}
		],
		"name": "proposeNewAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
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
				"name": "newAuction",
				"type": "address"
			}
		],
		"name": "retractVoteNewAuction",
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
		"name": "viewAuctionAtIndex",
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
			}
		],
		"stateMutability": "view",
		"type": "function"
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
				"internalType": "address",
				"name": "newAuction",
				"type": "address"
			}
		],
		"name": "voteNewAuction",
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
		"name": "votedAuctions",
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
	}
];

async function update_curr_bid(){
    web3.eth.defaultAccount = $("#myaccount").val();
	console.log("curr highest bid call")
    // let curr_min_bid = await english_contract.methods.currentHighestBid().call({from:web3.eth.defaultAccount});
	console.log("SUCCESS")
	//curr_min_bid = curr_min_bid
    //$("#curr-min-bid").html(curr_min_bid * 10**(-18) + " ETH");
}

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

async function update_ownership(address){
	curr_address = address.toLowerCase()
	let third_party_address = await english_contract.methods.thirdParty().call({from:web3.eth.defaultAccount});
	third_party_address = third_party_address.toLowerCase();
	// let winner_address = '0' //temp
	// console.log(curr_address)
	let winner_address = await english_contract.methods.winner().call({from:web3.eth.defaultAccount});
	winner_address = winner_address.toLowerCase();

	let duration = await english_contract.methods.duration().call({from:web3.eth.defaultAccount});
	if (duration == 0){
		$("#over-label").html("This auction has ended");
	}
	
}

async function update_balance2(){
	address = $("#myaccount").val();
	update_balance(address);
	update_ownership(address);
}

async function get_auction_info(){
	auction_address = await multibid_contract.methods._currentAuction().call({from:web3.eth.defaultAccount});
	console.log(auction_address);
	$("#auction-address").html(auction_address);
	english_contract = new web3.eth.Contract(english_abi, auction_address);
	curr_highest_bid = await english_contract.methods.highestBid().call({from:web3.eth.defaultAccount});
	$("#curr-high-bid").html(curr_highest_bid);
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
    } else {
       $("#duration").html(hours + "H " + minutes + "M");
    }
}

async function get_multibid_info(){
	multibid_balance = await web3.eth.getBalance(multibid_address);
	console.log(multibid_balance);
	$("#multibid-balance").html("Multibid Contract Balance: "+multibid_balance+" Wei");
	stake = await multibid_contract.methods.seeMyStake().call({from:web3.eth.defaultAccount});
	totalVotingPower = await multibid_contract.methods.totalVotingPower().call({from:web3.eth.defaultAccount})
	percent_ownership = stake/totalVotingPower*100;
	$("#stake").html("Stake: "+percent_ownership+"%");
}

$(document).ready(function(){

	multibid_contract = new web3.eth.Contract(multibid_abi, multibid_address);
	get_multibid_info();
	get_auction_info();

	web3.eth.getAccounts().then((response)=> {
		web3.eth.defaultAccount = response[0];
		update_balance(response[0]);
		//update_ownership(response[0]);
	});
	// Allows switching between accounts in 'My Account'
	web3.eth.getAccounts().then((response)=>{
		var opts = response.map(function (a) { return '<option value="'+
				a.toLowerCase()+'">'+a.toLowerCase()+'</option>' });
		$(".account").html(opts);
		web3.eth.defaultAccount = $("#myaccount").val();
	});

	update_curr_bid();
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
	$("#submit-bid").click(async function() {
		
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		// let winner_address = await english_contract.methods.winner().call({from:web3.eth.defaultAccount});
		let third_address = $("#third-address").val()
		//let duration = await english_contract.methods.duration().call({from:web3.eth.defaultAccount});
		let duration = 86400;
		if (duration == 0){
			alert("This auction is over!")
		} else if (web3.eth.defaultAccount.toLocaleLowerCase() == third_address.toLocaleLowerCase()) {
			alert("You cannot name yourself as the third party!")
		} else {
			let unit = $("#units").val();
			alert(unit)
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
			// not sure if need to keep
			update_curr_bid();
			update_balance($("#myaccount").val());
			update_ownership($("#myaccount").val());
		}
	})



	$("#end-auction-button").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		await english_contract.methods.endAuction().send({from:web3.eth.defaultAccount});
		alert('Auction Ended')
		update_curr_bid();
	})


	$("#check-min-bid").click(async function() {
		update_curr_bid();
	})

    $("#submit-bid").html("Submit Bid");
	$("#withdraw-bid").html("Withdraw Bid");
	$("#check-min-bid").html("Update");
	$("#end-auction-button").html("End Auction");
	
})