// sets up web3.js
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

// =============================================================================
//         ABIs and Contract Addresses: Paste Your ABIs/Addresses Here
// =============================================================================

const english_spawner_address = '0xf5f87bBd199b9a7875ae1C4138741AFA238Fba9b';     
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


async function create_new(min_bid_amt,duration,address,name){
	duration = duration * 60 * 60;
    await english_spawner_contract.methods.createAuction(min_bid_amt,duration,address,name).send({from:address, gas:2000000});
    let english_address = await english_spawner_contract.methods.getMostRecentListing().call({from:address})
    return english_address;
}

$("#submit-auction").click(async function() {
	web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
    let min_bid_amt = $("#min-bid-amt").val();
    let duration = $("#duration").val();
	let name = $("#item-name").val();
    let english_address = await create_new(min_bid_amt,duration,web3.eth.defaultAccount,name);
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