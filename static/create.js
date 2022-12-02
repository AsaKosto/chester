// sets up web3.js
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

// =============================================================================
//         ABIs and Contract Addresses: Paste Your ABIs/Addresses Here
// =============================================================================

const english_address = '0x96a318aC678a5272CcCD08d73318772AD3Efdf39';     
const english_abi = [


];     
// const english_contract = new web3.eth.Contract(english_abi, english_address);        

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

var auction_types = {
    ValueA : 'English',
    ValueB : 'MultiBid',
    ValueC : 'Text C'
};

var select = document.getElementById("auction-type");
for(index in auction_types) {
    select.options[select.options.length] = new Option(auction_types[index], index);
}

// This gets the auction information
$("#submit-auction").click(function() {
	web3.eth.defaultAccount = $("#myaccount").val(); //sets the default account
    createContract($("auction-type").val(),$("min-bid-amt").val(),$("item-name").val(),$("duration").val());
    location.href = 'index.html'
})




// This fills in UI information
$("#submit-auction").html("Submit");




// ============================================================
//                    FUNCTIONS
// ============================================================


function createContract(auction, min_bid, item, duration ) {
    if (auction == "English") {
        //NEEDS TO COME FROM MAIN CONTRACT
       // await main_contract.methods.....
       //temp way
       alert("english")
        
    }

}