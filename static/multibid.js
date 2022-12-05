// sets up web3.js
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

// =============================================================================
//         ABIs and Contract Addresses: Paste Your ABIs/Addresses Here
// =============================================================================

///THESE ARE HARDCODED FOR NOW
// const english_address = '0xBd1945E5e7f0Db91dcFbb4b48813b11694D3e008';     
const owner_address = '0x48FD7c0D8c5c1A305e5E88f1AF12E88e804E2112';
// const multibid_abi =  

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
	curr_address = address.toLowerCase()
	let third_party_address = await english_contract.methods.thirdParty().call({from:web3.eth.defaultAccount});
	third_party_address = third_party_address.toLowerCase();
	// let winner_address = '0' //temp
	// console.log(curr_address)
	let winner_address = await english_contract.methods.winner().call({from:web3.eth.defaultAccount});
	winner_address = winner_address.toLowerCase();
	
	if (curr_address == owner_address.toLocaleLowerCase()){
		$("#ownership-label").html("You are the lister of this auction");
	} else if (curr_address == third_party_address) {
		$("#ownership-label").html("You are the active third party of this auction");
	} else if (curr_address == winner_address){// && winner_address != '0x0000000000000000000000000000000000000000'){
		$("#ownership-label").html("You are currently winning this auction");
	} else {
		$("#ownership-label").html("Viewing");
	}

	if (curr_address == owner_address.toLocaleLowerCase()) {
		document.getElementById('end-auction-button').style.visibility='visible';
	} else {
		document.getElementById('end-auction-button').style.visibility='hidden';
	}

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

$(document).ready(function(){
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
		if (duration == 0){
			alert("This auction is over!")
		} else if (web3.eth.defaultAccount.toLocaleLowerCase() == owner_address.toLowerCase()) {
			alert("The lister cannot bid on their own auction!")
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
			alert(amount)
			await english_contract.methods.bid($("#third-address").val()).send({from:web3.eth.defaultAccount,
																				value:amount})
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