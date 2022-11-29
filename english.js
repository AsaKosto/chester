// sets up web3.js
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

// =============================================================================
//         ABIs and Contract Addresses: Paste Your ABIs/Addresses Here
// =============================================================================

const english_address = '0xf56A7EE3EDcD36c5CE1b500b173B2c7A773cF9AF';     
const english_abi = [
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
		"name": "endAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
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
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "withdrawBid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
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
	}
];

const english_contract = new web3.eth.Contract(english_abi, english_address);        

// This sets the default account on load and displays the total owed to that
// account.
web3.eth.getAccounts().then((response)=> {
    web3.eth.defaultAccount = response[0];
});
// Allows switching between accounts in 'My Account'
web3.eth.getAccounts().then((response)=>{
    var opts = response.map(function (a) { return '<option value="'+
            a.toLowerCase()+'">'+a.toLowerCase()+'</option>' });
    $(".account").html(opts);
});

async function update_curr_bid(){
    web3.eth.defaultAccount = $("#myaccount").val();
    let curr_min_bid = await english_contract.methods.currentHighestBid().call({from:web3.eth.defaultAccount});
    $("#curr-min-bid").html(curr_min_bid * 10**(-18) + "ETH");
    let duration = await english_contract.methods.duration().call({from:web3.eth.defaultAccount});
    let begin = await english_contract.methods.startTime().call({from:web3.eth.defaultAccount});
    const d = new Date();
    let time = Math.floor(d.getTime()/ 1000);
    let time_passed = time - begin;
    let time_left = duration - time_passed;
    console.log(time)
    console.log(begin)
    console.log(time_passed)
    console.log(time_left)
    if (time_left < 0){
        $("#duration").html(0);
    } else {
        $("#duration").html(time_left);
    }
    
}


$("#submit-bid").click(async function() {
	web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
    await english_contract.methods.bid($("#third-address").val()).send({from:web3.eth.defaultAccount,
                                                                        value:$("#bid").val()},
                                                                        function(error, hash){
                                                                            if (error) {
                                                                                const e = error;
                                                                                const data = e.data;
                                                                                const txHash = Object.keys(data)[0]; // TODO improve
                                                                                const reason = data[txHash].reason;
                                                                            
                                                                                console.log(reason); // prints "This is error message"
                                                                            
                                                                        }
                                                                    });
    update_curr_bid();
})

$("#end-auction").click(async function() {
	web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
    await english_contract.methods.endAuction().send({from:web3.eth.defaultAccount});
    alert('Auction Ended')
    update_curr_bid();
})


$("#check-min-bid").click(async function() {
	update_curr_bid();
})

$("#title").html("English Auction");

$("#submit-bid").html("Submit Bid");
$("#check-min-bid").html("Update");
$("#end-auction").html("End Auction");
