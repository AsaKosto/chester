

// sets up web3.js
//const web3 = new Web3(Web3.givenProvider)// || "ws://localhost:8545");

if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
	// Web3 browser user detected. You can now use the provider.
    provider = window['ethereum'] || window.web3.currentProvider;
    web3 = new Web3(provider);
	web3.eth.getAccounts().then(console.log);
} else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

const multi_spawner_address = '0xdaa6F037f73564f913492725a16e1fCeC78EC69F';
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

const english_spawner_address = '0x7adF0cd0f0953C39AD57C4D29Cc3263Cc85e77F8';     
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
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
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
web3.eth.requestAccounts().then(console.log);
//ethereum.enable()

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
	let currBlock = await web3.eth.getBlockNumber();
	let ev = await english_spawner_contract.getPastEvents("auctionCreated", {
		fromBlock: Math.max(currBlock - 40500,0),
		toBlock: "latest"
	});
	console.log(ev)
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
	let currBlock = await web3.eth.getBlockNumber();
	let ev = await multi_spawner_contract.getPastEvents("multiBidCreated", {
		fromBlock: Math.max(currBlock - 40500,0), //average number of eth blocks mined in a week + a little wiggle room
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

	$("#home").click(function() {
		location.href = 'index.html'
	})

	$("#go-e").click(function() {
		let english_address = $("#e-address").val()
		let params = new URLSearchParams();
		params.append("address", english_address);
		let url = 'english.html?' + params.toString();
		console.log(url)
		location.href = url;
	})

	$("#go-mb").click(function() {
		let multi_address = $("#mb-address").val()
		let params = new URLSearchParams();
		params.append("address", multi_address);
		let url = 'multibid.html?' + params.toString();
		console.log(url)
		location.href = url;
	})


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
