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

// const set_english_address = '0x92d7719e968aef8cE130B25FdadE61B8186CEF56';
var english_address = 0;
var english_contract = 0;
var owner_address = 0;


// const english_contract = new web3.eth.Contract(english_abi, english_address);        

async function update_curr_bid(){
    web3.eth.defaultAccount = $("#myaccount").val();
	console.log("curr highest bid call")
    let curr_min_bid = await english_contract.methods.currentHighestBid().call({from:web3.eth.defaultAccount});
	console.log("SUCCESS")
	curr_min_bid = curr_min_bid
    $("#curr-min-bid").html(curr_min_bid * 10**(-18) + " ETH");
    let duration = await english_contract.methods.duration().call({from:web3.eth.defaultAccount});
    let begin = await english_contract.methods.startTime().call({from:web3.eth.defaultAccount});
    const d = new Date();
    let time = Math.floor(d.getTime()/ 1000);
    let time_passed = time - begin;
    let time_left = duration - time_passed;

	//let time_left = 5400
	hours = Math.floor(time_left/(60*60))
	minutes = Math.floor((time_left % (60*60)) / 60)
    if (time_left < 0){
        $("#duration").html(0);
		await english_contract.methods.endAuction().send({from:web3.eth.defaultAccount});
    } else {
        $("#duration").html(hours + "H " + minutes + "M");
    }
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
	// console.log(address)
	hide_buttons();
	let duration = await english_contract.methods.duration().call({from:web3.eth.defaultAccount});
	owner_address = await english_contract.methods.admin().call({from:web3.eth.defaultAccount});
	// console.log(owner_address)
	curr_address = address.toLowerCase()
	let third_party_address = await english_contract.methods.thirdParty().call({from:web3.eth.defaultAccount});
	third_party_address = third_party_address.toLowerCase();
	
	let winner_address = await english_contract.methods.winner().call({from:web3.eth.defaultAccount});
	winner_address = winner_address.toLowerCase();
	if (curr_address == owner_address.toLowerCase()){
		$("#ownership-label").html("You are the lister of this auction");
		$("#owner-label").html("OWNER OPTIONS");
		$("#third-label").html("");
		$("#winner-label").html("");
		$("#third-address-display").html("");
		if (duration == 0)
			$("#third-address-display").html("Third Party Address: " + third_party_address);
		show_owner_buttons(curr_address);
	} else if (curr_address == third_party_address) {
		$("#ownership-label").html("You are the active third party of this auction");
		$("#owner-label").html("");
		$("#third-address-display").html("");
		$("#third-label").html("THIRD PARTY OPTIONS");
		$("#winner-label").html("");
		show_third_buttons(curr_address);
	} else if (curr_address == winner_address){
		
		show_winner_buttons(curr_address);
		$("#owner-label").html("");
		$("#third-label").html("");
		$("#third-address-display").html("");
		$("#winner-label").html("WINNER OPTIONS");
		if (duration > 0) {
			$("#ownership-label").html("You are currently winning this auction!");
		} else {
			$("#ownership-label").html("You won this auction!");
		}	
	} else {
		$("#ownership-label").html("Viewing");
		$("#third-approved").html("");
		$("#owner-sig").html("");
		$("#winner-sig").html("");
		$("#third-sig").html("");
		$("#sig-label").html("");
		$("#owner-label").html("");
		$("#third-label").html("");
		$("#winner-label").html("");
		$("#third-address-display").html("");
	}

	if (duration == 0){
		$("#over-label").html("This auction has ended");
	}
}

function hide_buttons(){
	document.getElementById('end-auction-button').style.visibility='hidden';
	document.getElementById('approve-third-button').style.visibility='hidden';
	document.getElementById('approve-button').style.visibility='hidden';
	document.getElementById('approve-button2').style.visibility='hidden';
	document.getElementById('reject-button').style.visibility='hidden';
	document.getElementById('cashout-button').style.visibility='hidden';
	document.getElementById('reject-button2').style.visibility='hidden';
	document.getElementById('withdraw-button').style.visibility='hidden';
	document.getElementById('approve-button3').style.visibility='hidden';
	document.getElementById('reject-button3').style.visibility='hidden';
	$("#third-approved").html("")
}

async function show_owner_buttons(address){
	let duration = await english_contract.methods.duration().call({address});
	if (duration == 0) {
		let third_party_approved = await english_contract.methods.thirdPartyApproved().call({address});
		if (!third_party_approved)
			document.getElementById('approve-third-button').style.visibility='visible';
		else 
			$("#third-approved").html("Third Party Approved")
		show_signatures(address)
		let owner_signed_to_pay = await english_contract.methods.ownerSigPay().call({address});
		let owner_signed_to_withdraw = await english_contract.methods.ownerSigWithdraw().call({address});
		if (!(owner_signed_to_pay || owner_signed_to_withdraw)){
			document.getElementById('approve-button').style.visibility='visible';
			document.getElementById('reject-button').style.visibility='visible';
		}	
		let winner_signed_to_pay = await english_contract.methods.winnerSigPay().call({address});
		let winner_signed_to_withdraw = await english_contract.methods.winnerSigWithdraw().call({address});
		let third_signed_to_pay = await english_contract.methods.thirdPartySigPay().call({address});
		let third_signed_to_withdraw = await english_contract.methods.thirdPartySigWithdraw().call({address});
		console.log("B")
		let balance = await web3.eth.getBalance(english_contract.options.address);
		console.log(balance)
		if ((owner_signed_to_pay && winner_signed_to_pay) || (owner_signed_to_pay && third_signed_to_pay) || (third_signed_to_pay && winner_signed_to_pay)){
			if (balance > 0)
				document.getElementById('cashout-button').style.visibility='visible';
		}
		
	} else {
		document.getElementById('end-auction-button').style.visibility='visible';
	}
}

async function show_winner_buttons(address){
	let duration = await english_contract.methods.duration().call({address});
	console.log(duration)
	if (duration == 0) {
		let winner_signed_to_pay = await english_contract.methods.winnerSigPay().call({address});
		let winner_signed_to_withdraw = await english_contract.methods.winnerSigWithdraw().call({address});
		show_signatures(address);
		if (!(winner_signed_to_pay || winner_signed_to_withdraw)){
			document.getElementById('approve-button2').style.visibility='visible';
			document.getElementById('reject-button2').style.visibility='visible';
		} 
		let owner_signed_to_pay = await english_contract.methods.ownerSigPay().call({address});
		let owner_signed_to_withdraw = await english_contract.methods.ownerSigWithdraw().call({address});
		let third_signed_to_pay = await english_contract.methods.thirdPartySigPay().call({address});
		let third_signed_to_withdraw = await english_contract.methods.thirdPartySigWithdraw().call({address});
		console.log("B")
		let balance = await web3.eth.getBalance(english_contract.options.address);
		console.log(balance)
		if ((owner_signed_to_withdraw && winner_signed_to_withdraw) || (owner_signed_to_withdraw && third_signed_to_withdraw) || (third_signed_to_withdraw&& winner_signed_to_withdraw)){
			if (balance > 0)
				document.getElementById('withdraw-button').style.visibility='visible';
		}
	}
}

async function show_third_buttons(address){
	let duration = await english_contract.methods.duration().call({address});
	let owner_signed_to_pay = await english_contract.methods.ownerSigPay().call({address});
	let owner_signed_to_withdraw = await english_contract.methods.ownerSigWithdraw().call({address});
	let winner_signed_to_pay = await english_contract.methods.winnerSigPay().call({address});
	let winner_signed_to_withdraw = await english_contract.methods.winnerSigWithdraw().call({address});
	let third_party_approved = await english_contract.methods.thirdPartyApproved().call({address});
	if (duration == 0) {
		show_signatures(address);
		let third_signed_to_pay = await english_contract.methods.thirdPartySigPay().call({address});
			let third_signed_to_withdraw = await english_contract.methods.thirdPartySigWithdraw().call({address});
		if (third_party_approved) {
			if (!(third_signed_to_pay || third_signed_to_withdraw)){
				document.getElementById('approve-button3').style.visibility='visible';
				document.getElementById('reject-button3').style.visibility='visible';
			}
		} 
	}
}


async function show_signatures(address){
	let winner_signed_to_pay = await english_contract.methods.winnerSigPay().call({address});
	let winner_signed_to_withdraw = await english_contract.methods.winnerSigWithdraw().call({address});
	if (winner_signed_to_pay) {
		$("#winner-sig").html("Winner has approved the auction");
	} else if (winner_signed_to_withdraw) {
		$("#winner-sig").html("Winner has rejected the auction");
	}
	let owner_signed_to_pay = await english_contract.methods.ownerSigPay().call({address});
	let owner_signed_to_withdraw = await english_contract.methods.ownerSigWithdraw().call({address});
	if (owner_signed_to_pay) {
		$("#owner-sig").html("Owner has approved the auction");
	} else if (owner_signed_to_withdraw) {
		$("#owner-sig").html("Owner has rejected the auction");
	}
	let third_signed_to_pay = await english_contract.methods.thirdPartySigPay().call({address});
	let third_signed_to_withdraw = await english_contract.methods.thirdPartySigWithdraw().call({address});
	if (third_signed_to_pay) {
		$("#third-sig").html("The third party has approved the auction");
	} else if (third_signed_to_withdraw) {
		$("#third-sig").html("The third party has rejected the auction");
	} else {
		$("#third-sig").html("");
	}
	$("#sig-label").html("SIGNATURES")
}

async function update_balance2(){
	address = $("#myaccount").val();
	update_balance(address);
	update_ownership(address);
}

async function signPay(address){
	let duration = await english_contract.methods.duration().call({from:address});
	if (duration == 0) {
		await english_contract.methods.signToPay().send({from:address});
	} else {
		alert("The Auction is still open!")
	}
	update_ownership(address);
}

async function signWithdraw(address){
	let duration = await english_contract.methods.duration().call({from:address});
	if (duration == 0) {
		await english_contract.methods.signToWithdraw().send({from:address});
	} else {
		alert("The Auction is still open!")
	}
	update_ownership(address);
}

$(document).ready(function(){

	let params = new URLSearchParams(window.location.search),
		first = params.get("address");
	console.log(first)
	if (first != null){
		console.log("Using params input address")
		english_address = first;
		
		$("#auction-address").html(english_address)
		english_contract = new web3.eth.Contract(english_abi, english_address);        	
	} else {
		console.log("Using set address")
		$("#auction-address").html(set_english_address)
		english_contract = new web3.eth.Contract(english_abi, set_english_address)
	}

	web3.eth.getAccounts().then((response)=> {
		web3.eth.defaultAccount = response[0];
		update_balance(response[0]);
		update_ownership(response[0]);
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
		let winner_address = await english_contract.methods.winner().call({from:web3.eth.defaultAccount});
		let third_address = $("#third-address").val()
		let duration = await english_contract.methods.duration().call({from:web3.eth.defaultAccount});
		console.log("DURATION")
		console.log(duration)
		if (duration == 0){
			alert("This auction is over!")
		} else if (web3.eth.defaultAccount.toLocaleLowerCase() == owner_address.toLowerCase()) {
			alert("The lister cannot bid on their own auction!")
		} else if (web3.eth.defaultAccount.toLocaleLowerCase() == third_address.toLocaleLowerCase()) {
			alert("You cannot name yourself as the third party!")
		} else {
			let unit = $("#units").val();
			// alert(unit)
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
			// alert(amount)
			let curr_min_bid = await english_contract.methods.currentHighestBid().call({from:web3.eth.defaultAccount});
			console.log("BIDDING")
			if (amount <= curr_min_bid)
				alert("You are not beating the current highest bid!")
			else
				await english_contract.methods.bid($("#third-address").val()).send({from:web3.eth.defaultAccount,
																				value:amount})
			console.log("BID")
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
		update_ownership(web3.eth.defaultAccount);
	})

	$("#check-min-bid").click(async function() {
		update_curr_bid();
	})

	$("#approve-third-button").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val();
		let duration = await english_contract.methods.duration().call({from:web3.eth.defaultAccount});
		if (duration == 0) {
			await english_contract.methods.approveThirdParty().send({from:web3.eth.defaultAccount});
		} else {
			alert("The Auction is still open!")
		}
		update_ownership(web3.eth.defaultAccount);
	})

	$("#approve-button").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val();
		signPay(web3.eth.defaultAccount);
	})

	$("#reject-button").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val();
		signWithdraw(web3.eth.defaultAccount);
	})

	$("#approve-button2").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val();
		signPay(web3.eth.defaultAccount);
	})

	$("#reject-button2").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val();
		signWithdraw(web3.eth.defaultAccount);
	})

	$("#approve-button3").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val();
		signPay(web3.eth.defaultAccount);
	})

	$("#reject-button3").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val();
		signWithdraw(web3.eth.defaultAccount);
	})

	$("#cashout-button").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val();
		english_contract.methods.cashOut().send({from:web3.eth.defaultAccount});
		update_balance2();
	})

	$("#withdraw-button").click(async function() {
		web3.eth.defaultAccount = $("#myaccount").val();
		english_contract.methods.withdrawBid().send({from:web3.eth.defaultAccount});
		update_balance2();
	})


	$("#title").html("English Auction");

	$("#submit-bid").html("Submit Bid");
	$("#withdraw-bid").html("Withdraw Bid");
	$("#check-min-bid").html("Update");
	$("#end-auction-button").html("End Auction");
	$("#approve-third-button").html("Approve Third Party")
	$("#approve-button").html("Approve Auction")
	$("#reject-button").html("Reject Auction")
	$("#cashout-button").html("Cashout")
	$("#approve-button2").html("Approve Auction")
	$("#reject-button2").html("Reject Auction")
	$("#withdraw-button").html("Withdraw")
	$("#approve-button3").html("Approve Auction")
	$("#reject-button3").html("Reject Auction")
	
})