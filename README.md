# chester

Aaron Ashery - ALA2201
Sergio Nahas - SN2865
Asa Kosto - ATK2142

Welcome To Chesster!
We have created a decentralized auction protocol that uses 2/3 multi-sig escrow protocol to bring the security of the blockchain to the physical transaction of high-value assets such as artwork. We also provide the option to use "multi-bids," which allow multiple parties to pool money to bid on an asset. The record of partial ownership is kept on-chain, and when the item is re-listed, withdraw a reward proportional to their initial contribution. 

To see some videos of Chester in action, see the following google drive link for the demo day presentation, an auction demo (run locally using the ganache provider), a multi-bid demo, and 2/3 signature demo to confirm the auction, both on the Goerli test network. 

https://drive.google.com/drive/folders/14QiGAUsxDDpM-He_W6CoZnMio51WnIUp?usp=sharing

The Chester auction spawner and multi-bid spawner are both deployed on the Goerli test network. Their addresses are hardcoded into the javascript files for the website, and are also here if you need them.
Auction Spawner Goerli Address: 0x32735f83b17539EfF9645FEEc0b8E1ba1ce530F1
Multi-Bid Spawner Goerli Address: 0xb90062787c5c10529F1E397E1aEABd01250eF04D

We reccomend interacting with the contracts directly, on the Goerli test chain. Chester is integrated with MetaMask, so as long as you have Goerli Test ETH and a web3 enabled browser, you can use Chester with the following instructions!

Chester is not currently hosted by us, because we are broke. To use MetaMask, you will need to host the website yourself. Download the repo, navigate to the top level "chester" directory, and start and http server instance.
* npm install http-server -g
* cd chester
* http-server
Navigate to localhost:8080 in your browser, and then to templates/index.html. You have now arrived at the Chester homepage. You can see all the auctions and multi-bids that have been created in the last week, and create your own! If you would like to test with your own metamask accounts, make sure you have at least 3 that all have some Goerli Test ETH and switch between them. Remember to refresh the page after you switch accounts! (also note that because the contracts are running on the test network)

If you would like to test chester locally, load the contracts into the REMIX IDE and deploy them on a ganache network (>>> ganache-cli). Copy and paste the new addresses into the approprately labeled spots in the javascript files, and set the provider to localhost. The provider is set by default to MetaMask at the top of each javascript file, but you can comment that section and uncomment the section above it to switch to a local provider. The test files in /test are meant to be run locally, because testing will take a long time on the network. 


