// sets up web3.js
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const english_spawner_address = '0xAc42254242682B9a60a6A80db7A8afa653C9AFb4';     
const english_spawner_abi =[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "minimumBid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address payable",
				"name": "admin",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "contract EnglishAuction",
				"name": "auction",
				"type": "address"
			}
		],
		"name": "auctionCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "minimumBid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "admin",
				"type": "address"
			}
		],
		"name": "createAuction",
		"outputs": [
			{
				"internalType": "contract EnglishAuction",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "genesis",
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
		"name": "mostRecentListing",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];     

const english_spawner_contract = new web3.eth.Contract(english_spawner_abi, english_spawner_address);


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

async function get_active_auctions(){
	let auctions = [];
	let ev = await english_spawner_contract.getPastEvents("auctionCreated", {
		fromBlock: (await web3.eth.getBlockNumber()) - 40500,
		toBlock: "latest"
	});
	for(var i = 0; i < ev.length; i++){
		auctions.push(ev[i].returnValues[3]);
		//console.log(ev[i].returnValues[3]);
	}
	console.log(auctions);
}

$(document).ready(function(){

	get_active_auctions();

	// This opens a new page to create an auction
	$("#create-auction").click(function() {
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		location.href = 'create.html'
	})

	$("#create-multibid").click(function() {
		web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
		location.href = 'create_multi.html'
	})

	
})
