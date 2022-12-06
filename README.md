# chester

Aaron Ashery - ALA2201
Sergio Nahas - SN2865
Asa Kosto - ATK2142

Instructions:

To run Chesster all that is required is a local test network such as Ganache.
The first step is to deploy the EnglishAuction Contract, which takes in the minimum bid, the duration, and the lister address.
The ABI currently has to be manually put into the english.js and multibid.js files. The address should be put into the english.js file as well.
Then deploy the MultiBid Contract, which just takes the english contract address. The address of the contract should be put into the multibid.js file as well.
The hardcoding of the addresses is temporary until the main interface is functional to control the deployment and viewing of all auctions.

Using the user interface in the multibid and english html pages, anybody can interact and explore all the functionality of Chesster.
