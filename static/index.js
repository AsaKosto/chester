// sets up web3.js
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const multi_spawner_address = '0xd73a38683C17145261Fe56Aef7A02A7911616e11';
const multi_spawner_abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "auction",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "contract MultiBid",
				"name": "multi",
				"type": "address"
			}
		],
		"name": "multiBidCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "auction",
				"type": "address"
			}
		],
		"name": "createMultiBid",
		"outputs": [],
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
		"name": "getMostRecentMultiBid",
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
		"name": "mostRecentMultiBid",
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

const english_spawner_address = '0xd8acA45CE69a456a830eCaD9c55C87dC06877be3';     
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
		"outputs": [],
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
		"name": "getMostRecentListing",
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
const multi_spawner_contract = new web3.eth.Contract(multi_spawner_abi, multi_spawner_address);

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
		fromBlock: (await web3.eth.getBlockNumber()) - 40500, //average number of eth blocks mined in a week + a little wiggle room
		toBlock: "latest"
	});
	for(var i = 0; i < ev.length; i++){
		auctions.push(ev[i].returnValues[3]);
	}
	//console.log(auctions);
	for(var i = 0; i < auctions.length; i++){
		var a = document.createElement('a');
		var linkText = document.createTextNode(auctions[i]);
		a.append(linkText);
		a.title = ""+auctions[i];
		let params = new URLSearchParams();
		params.append("address", auctions[i]);
		let url = 'english.html?' + params.toString();
		a.href = url;
		$("#active").append(a);
		$("#active").append("<br>");
	}
}

async function get_active_multis(){
	let multis = [];
	let ev = await multi_spawner_contract.getPastEvents("multiBidCreated", {
		fromBlock: (await web3.eth.getBlockNumber()) - 40500, //average number of eth blocks mined in a week + a little wiggle room
		toBlock: "latest"
	});
	for(var i = 0; i < ev.length; i++){
		multis.push(ev[i].returnValues[1]);
	}
	//console.log(multis);
	for(var i = 0; i < multis.length; i++){
		var a = document.createElement('a');
		var linkText = document.createTextNode(multis[i]);
		a.append(linkText);
		a.title = ""+multis[i];
		let params = new URLSearchParams();
		params.append("address", multis[i]);
		let url = 'multibid.html?' + params.toString();
		a.href = url;
		$("#recent").append(a);
		$("#recent").append("<br>");
	}
}

$(document).ready(function(){

	get_active_auctions();
	get_active_multis();

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
