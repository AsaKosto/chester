/*
 * Deploy English.sol contract on Remix and modify addresses and contract address in english_address
 * Run test with command node english_test.js
 */


const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
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
		"name": "getAdmin",
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
		"name": "getWinner",
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
var english_address = '0xa7ce9A5b910CB1d3A42b3Eb47bC7bE54AaF32323';
var english_contract = new web3.eth.Contract(english_abi, english_address);


function check(name, condition) {
	if (condition) {
		console.log(name + ": SUCCESS");
		return 1;
	} else {
		console.log(name + ": FAILED");
		return 0;
	}
}

async function sanityCheck() {
    console.log("\nENGLISH AUCTION CONTRACT TEST:\n");
    var score = 0;
    var admin = '0xa3367cB3DF4ffBDcA189386f4433780B78C54d78';
    var address1 = '0xF21180fb3f880A1d3b118eae8D9ab9bc7526ecA9'; //hardcode address for testing
    var thirdParty = '0x4c6A46d05A86138Bfbdf7a91ECbe6749D0C37Bd3'; //hardcode address of third party
    // TEST 1: Bid
    // Address will bid X amount
    var bidAmount = 60;
    await english_contract.methods.bid(thirdParty).send({from:address1, value:bidAmount});
    // read curr high bid
    var highestBid = await english_contract.methods.currentHighestBid().call({from:address1});
    score += check("highestBid update", parseInt(highestBid) === parseInt(bidAmount));
    // read third party
    var thirdParty_read = await english_contract.methods.thirdParty().call({from:address1});
    score += check("Third Party update", thirdParty_read === thirdParty);
    // outbid with diff thirdParty
    var address2 = '0xc53394A32407f4FDdD4b2d9305994529265b6C2B';
    var thirdParty2 = '0x21c0DdfD8062333C41975a21176bb2b5bF2e9b60';
    var outbidAmount = bidAmount + 1;
    await english_contract.methods.bid(thirdParty2).send({from:address2, value:outbidAmount});
    var outbid = await english_contract.methods.currentHighestBid().call({from:address2});
    score += check("outbid highestBid update", parseInt(outbid) === parseInt(outbidAmount));
    var outbidThirdParty = await english_contract.methods.thirdParty().call({from:address2});
    score += check("Third Party outbid update", outbidThirdParty === thirdParty2);
    // admin
    var admin_read = await english_contract.methods.admin().call({from:address1});
    score += check("Admin check", admin === admin_read);
    //winner
    var winner_read = await english_contract.methods.winner().call({from:address1});
    score += check("Admin check", address2 === winner_read); //because address 2 outbid
    // endAuction
    await english_contract.methods.endAuction().send({from:admin});
    var duration_read = await english_contract.methods.duration().call({from:admin});
    score += check("Duration Check", duration_read === '0'); //duration set to 0 after endAuction
    await english_contract.methods.approveThirdParty().send({from:admin});
    var thirdPartyApproval_read = await english_contract.methods.thirdPartyApproved().call({from:admin});
    score += check("Third Party Approval Check", thirdPartyApproval_read === true);
    console.log("Final Score: " + score +"/8");
    return score;
}

sanityCheck()

