// sets up web3.js
//const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
	// Web3 browser user detected. You can now use the provider.
    provider = window['ethereum'] || window.web3.currentProvider;
    web3 = new Web3(provider);
	web3.eth.getAccounts().then(console.log);
} else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

// =============================================================================
//         ABIs and Contract Addresses: Paste Your ABIs/Addresses Here
// =============================================================================

<<<<<<< HEAD
const english_spawner_address = '0x7adF0cd0f0953C39AD57C4D29Cc3263Cc85e77F8';     
=======
const english_spawner_address = '0x566153de38E3acBa05375B2Dc45ea8c414dE6839';     
>>>>>>> c4c8c3a4ee903327ff52caf16630b93981b47840
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

var denominations = {
	Ether : 'Ether',
	Wei : 'Wei',
	Gwei : 'Gwei'
};

var select = document.getElementById("units");
for(index in denominations) {
	select.options[select.options.length] = new Option(denominations[index], index);
}

async function create_new(min_bid_amt,duration,address,name){
	duration = duration * 60 * 60;
    await english_spawner_contract.methods.createAuction(min_bid_amt,duration,address,name).send({from:address, gas:2000000});
    let english_address = await english_spawner_contract.methods.getMostRecentListing().call({from:address})
    return english_address;
}

$("#submit-auction").click(async function() {
	web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
    // let min_bid_amt = $("#min-bid-amt").val();
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
	let min_bid_amt = $("#min-bid-amt").val() * scale;
	console.log(min_bid_amt)
    let duration = $("#duration").val();
	let name = $("#item-name").val();
    let english_address = await create_new(BigInt(min_bid_amt),duration,web3.eth.defaultAccount,name);
	console.log(english_address)
    //english_address = english_spawner_contract.methods.call
    let params = new URLSearchParams();
    params.append("address", english_address);
    let url = 'english.html?' + params.toString();
	console.log(url)
    location.href = url;
})


// This fills in UI information
$("#submit-auction").html("Submit");

function createContract(auction, min_bid, item, duration ) {
    if (auction == "English") {
        //NEEDS TO COME FROM MAIN CONTRACT
       // await main_contract.methods.....
       //temp way
       alert("english")
        
    }

}


$(document).ready(function(){
	web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account

});