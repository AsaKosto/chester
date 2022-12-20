# Chesster

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

If you would like to test chester locally, load the contracts into the REMIX IDE and deploy them on a ganache network (ganache-cli). Copy and paste the new addresses into the approprately labeled spots in the javascript files, and set the provider to localhost. The provider is set by default to MetaMask at the top of each javascript file, but you can comment that section and uncomment the section above it to switch to a local provider. The test files in /test are meant to be run locally, because testing will take a long time on the network. 

Typical Usage: 
This section will explain how some typical users, Alice, Bob, Charlie, David, Earl, and Felicity might use the app.
See the demo videos for a UI walkthrough!

Individual Bids:
A: create auction
B: submit bid with C as third party
D: submit higher bid with C as third party, B recieves money back
-Auction Ends-
D: signs to pay
A: approves C
C: signs to pay
A: signs to pay
A: cashes out

Multi-Bid:
A: create auction
B: create multi bid, add 1 ETH
C: join multi-bid, add 2 ETH
B: propose D as third party
B: vote for D as third party
C: vote for D as third party
B or C: submit bid
-Auction Ends-
A: approves D as third party
A: signs to pay
B and C: vote to pay
B or C: sign to pay
A: cash out
-B now owns 1/3 of listed item, C owns 2/3-
B or C: proposes listing params (time, min bid)
B and C: vote on listing params
B or C: re-List
E: bids 30 ETH on B/C re-listing
E: proposes F as third party
-auction ends-
B and C: vote to approve F
B and C: vote to pay
B or C: sign to pay
E: sign to pay
B: withdraws 10 ETH
C: withdraws 20 ETH




Explanations and More Information:

The concept of blockchain auctions is absolutely nothing new. The ability to have anonymity, security, and guaranteed payment are all obvious benefits. Multiple services exist that allow users to post items for a set sale price or for auction, mostly on the dark web. These platforms, however, are often populated with bad actors, illegal goods, and are inflexible. Many existing services also use alternate chains or service-specific blockchains that affect final sale values because of exchange rates and volatility.

We propose to create Chesster: an open source platform that enables a party to create a secure and flexible auction, tailored specifically to the art market using the Ethereum blockchain and smart contracts.

Section 1:Why the art market? Chesster Solves: Valuation, Security, Anonymity, Art Ownership, Speculation

The nature of art ownership: Owning a piece of art is a strange thing. Owning a piece of art doesn't necessarily mean physically possessing it. In most cases, pieces are kept in private collections, massive storehouses, or museums. It is common for a buyer to "donate" a piece to a museum and allow them to display it while still maintaining ownership, and even more common still for pieces to be kept in storage facilites or warehouses, where they can be bought and sold without ever leaving storage. Also, due to the age or fragility of some pieces, moving them could be dangerous, and owners do not want to risk damaging the piece and hence the value of their collection. The main consequence of this is that when pieces are bought and sold, sometimes the only thing that changes hands is a contract called certificate of ownership. This norm could be made more secure and reliable through an on-chain record of provenance. Paintings in museums could be bought and sold hundreds of times over while remaining available for the public to see, fragile pieces could be safely stored while being auctioned, and the record of provenance would be completely indisputable. Also, it would be simple to implement a 2/3 multisig escrow protocol so that the art can be verified to the buyer's standard.

Valuation: One of the primary difficulties in buying or selling a piece of art is how to set a proper price. Art valuation is inherently a subjective task that takes into account many factors such as the artist, the time period, the condition, the popularity of the piece itself, and the provenance. Usually, valuations are performed by appraisers who are hired by either the auction house or the private seller. Appraisers, auctioneers, and sellers are incentivized to give ridiculously high appraisals. This is possible because the sale history of the piece is often either private or difficult to ascertain, meaning there is no historical baseline for valuation in most cases. A blockchain solution clearly solves this problem by showing an on-chain record of amount that was paid during the auction. This is a benefit for buyers in the future, who can avoid getting prices hiked by opaque valuations, and for regulatory authorities, who can more accurately value collections based on the historical sale prices of similar pieces.

Security: At a physical auction, there is a risk of "partial or promised payment" scams. When bidding at an auction, a bidder does not need to actually have the money on hand, and hence payment is not guaranteed. Running the auction through a smart contract means that the item will only be "sold" if there are enough funds necessary for its purchase. Due to the sometimes sketchy nature of art collectors, particularly those whose money comes from dubious or volatile sources, this is an important concern. Regulatory authorities need to come in to enforce restitution if one party is scammed. An on-chain solution means that the auction platform itself enforces the sale, and if payment cannot be rendered, the sale is easily and verifiably nullified.

Anonymity: Often, wealthy patrons buying or selling art prefer to remain anonymous. This can be for a multitude of reasons, but the fact is that no auction house or even any private auction today can provide true anonymity. The ability to buy and sell high-valued goods anonymously is obviously in demand, buyers at auctions in the past have paid for pieces with cryptocurrency. A platform that allows anonymous listing, bidding, and arbitration is perfectly tailored to high value individuals or organizations who value their privacy transacting high value items.

Speculation: The art market is inherently speculative, and many collectors with no interest in art buy pieces purely for economic value. Chesster would allow multiple parties to join together and create a bid, which they can then re-list. Upon re-listing, the original buyers would be paid out relative to the percentage they contributed to the original purchase. A blockchain record of all the initial transaction makes automatic proportional payout easy. This ability to "split" a purchase with multiple parties in the same bid will also allow large numbers of people to own fractions of a piece, and gain access to the insane multiples of returns normally reserved for super-rich art collectors. This idea is already implemented through multiple services such as Masterworks and Yieldstreet, but those services are still susceptible to foul play or loss of records. With an on-chain record of who paid how much, the investment is guaranteed if the payout is managed by a smart contract instead of a central entity.

Section 2: Chesster's Features: Chesster will support multiple auction formats with multiple payment options: List: Sellers can list an item for a certain amount of time. Currently there is only one auction format, English, but in the future there could be more such as secret bids that take advantage of ZK-proofs (FPSB/SPSB for example). Bid: Buyers can currently bid on listings and in the future they will have the option to automatically match bids up to a certain amount. Authorize/Ensure: Buyers must propose a trusted third party (such as a well-known auction house with a publicly verifiable signature) to arbitrate transactions in the case of an escrow procedure being necessary. Multi-Bid: Multiple buyers can join together to create a bid that will pay out proportionally upon re-listing the item. Re-listing will require some percentage of signatures agreed upon in the initial bid.
 Chesster's main advantage is its simplicity and usability. We encapsulate all the transaction mechanics under the hood and provide an easy-to-use and intuitive API. Chesster will also allow listers to pay the third party a commission for their role in arbitrating the sale (*To be Implemented).

Section 3: Why Chesster?

Open Source: By making the code publicly available, there is complete transparency about how the transactions are being executed. Most blockchain payment platforms used for auctioning are run on the dark web and the creators can have malicious intent. To facilitate the sale of high-value goods like art, there needs to be a trust established between the seller, the buyer, and the platform.

In Demand: Christie's, Sotheby's and countless other small technology startups have created online marketplaces for NFTs and digital goods. These marketplaces are tailored totally towards the sale of digital items, and have not adapted, through the implementation of escrow protocols, to the transaction of real-world goods. Also, the fact that these marketplaces are owned by the auction houses themselves mean's that sellers still cannot sell without going through the auction house's marketplace and cannot avoid paying the exorbitant commissions and service fees, and can make the hiring of independent appraisers difficult. A platform that would allow sellers to name a third party or hold the auction themselves gives them more power over the terms of sale and a larger portion of the final sale price.

Scalability: Chesster can be easily adapted to a multi-purpose online marketplace/auction house if the initial implementation is successful. We believe starting with a solution tailored to the art market is the best way to start because of the reasons outlined in Section 1, but the concept has wide appeal. A platform with a simple API would be easy for existing marketplaces to adopt (Think FB marketplace, EBAY, Amazon, or auction houses themselves). The multiBid feature also can be expanded to other assets, not just art, that have higher rates of return than the public markets.

Section 4: Addressing Concerns and Misc

Concern 1) How do you know that the person listing a piece of art actually owns the real piece? Every sale will gives the buyer the ability to verify the piece to their own standard of satisfaction. The 2/3 multisig transaction protocol gives a flexibility for the buyer to make sure the piece is up to his standards, and if not the transaction does not go through.

Example: Bob lists the Mona Lisa

Case 1: Legitimate sale where Alice bids 10 ETH and wins the auction. Her money is posted inside the english auction contract. Bob sees the contract on the chain and allows Alice to verify the painting to her own standards. Alice verifies it and is satisfied, both parties sign the contract and the money is transferred to Bob.

Case 2: Illegitimate sale where Bob lists a fake Mona Lisa and Alice bids 10 ETH and wins the auction. Her money is posted inside the english auction contract. Bob sees the contract on the chain and allows Alice to verify the painting to her own standards. Alice is not satisfied so does not sign the contract. 3rd party service is required, and the 3rd party determines it is fake and signs payback transaction. Alice is refunded her 10 ETH.

Case 3: Bob list a real Mona Lisa and Alice tries to steal it. Alice bids 10 ETH and wins the auction. Her money is posted inside the english auction contract. Bob sees the contract on the chain and allows Alice to verify the painting to her own standards. Alice takes the Mona Lisa but does not sign the contract. 3rd party service is required, 3rd party determines painting was stolen and signs Bob payout transaction. Bob is transferred the 10 ETH.

This requires that the 3rd party be honest. However, if Alice posts a bid with a 3rd party that Bob does not trust, she still pays gas fees so she is incentivized to post a contract with a verifier that they both will agree on.

Concern 2) How do you know that the volatility of cryptocurrency will not affect the final sale price? You don't. There is an inherent volatility in all currency markets, and the best way to leverage the other advantages of blockchain technology is to denominate the sales in ETH. However, the volatility also creates the interesting possibility of bids that pay out a higher or lower dollar value than the original if they are slated to pay out at some time after the sale transaction takes place.

Concern 3) How do you prevent individuals with large amounts of money from running up prices and keeping everyone else out of the market? You can't entirely. That is one inherent flaw in the structure of auctions.

Concern 4) How is it different from any other blockchain auction platform? It is true that the core functionality of peer-to-peer auctions is not original. It is also true that multiple large auction houses which are the main venues for transacting high value goods have created their own platforms to hold auctions for digital goods. We believe that Chesster is clearly differentiated from other blockchain payment platforms and existing auction house platforms for the following reasons: -Limited initial scope: We are not creating a general purpose payment application, we are creating an auction platform. The unique auction format is not common in most marketplaces and as such, we are targeting our product towards marketplaces where the auction format is common. Because of the nature of sales in the art market (explained above), an on chain auction is a natural solution to many existing pain points in the market. -We are not an auction house: The existing on-chain auction houses are run by the physical auction houses, like Christie's and Sotheby's. The high sale commission is built into the platform. Chesster allows sellers to negotiate arbitration fees with third parties independently. The existing auction houses are also mainly geared towards NFTs and digital assets, with the vast majority of auctions for physical art being held physically. Chesster brings the security guarantees of blockchain technology as close to physical transactions as is possible. -MultiBid: The ability for multiple people to join in one payment for an asset and then be repaid proportionally when that asset is sold provides a unique feature to the auction format that did not exist previously. MultiBid will allow more people to attain partial ownership of pieces they enjoy and secure their investment. It will be a challenging feature to implement, but it will be a key differentiator from other existing on-chain auction services.

Concern 5) How do you monetize it? Chesster can set a small commission on every sale, or go with a standard free/paid tier model where some features are only available to subscribed customers. Either way, that is far in the future!


Security Discussion:

There exist smart contract auditors such as https://audity.one/ and also compilers such as the one in Remix can give feedback and point out security risks. Here we will point out what they say and how we dealt with them.

1. Reentrancy: The contract is vulnerable to reentrancy attacks, meaning a malicious user could call a function multiple times and cause unintended consequences.

    When bidding on auctions we get a reentrancy violation. Due to the structure of our ocntract this is not possible and cannot be exploited. When a valid bid is submitted the bidder's money is sent to the contract. At the same time the money that was in the contract is sent back to the previous highest bidder. A malicious attack could potentially manipulate contracts to call the trasnfer of the contracts value back to the previous winner multiple times, however this would be pointless. For example if an innocent party is the previous highest bidder and a malicious one outbids them using this exploitation, the value submitted by the malicious party would be transffered to the innocent party's account. There is no way the malicious actor could gain inccoent peoples ETH, they could only transfer their own by playing both roles.
    An issue is that if a malicious actor manipulates the contract in this way, they could win a bid with no ETH in the actual contract even though they are the highest bidder. In this case the owner would not sign the transaction and the bidder would never gain the item.

2. Unchecked Math: 
    Due to time limitations we were unable to implement the safe math library. This is to be added in the future and is a valid security issue that needs to be addressed.

3. User Interface (Not audited): 
    Due to time constraints the user interface is not complete. Most issues are of button visibility and user input feedback. While these UI issues exist, none allow a bad actor to maliciously affect an auction as the contract itself will not allow anything out of order to take place. In certain situations the stake in a multi-bid displayed on the website is inaccurate, and sometimes the buttons to vote for or retract votes for third parties do not appear when they should. Both of these bugs (and there are undoubtedly more), do not affect the contract itself. With the stake display bug in particular, we have checked that the stakes are updated appropriately in the contract and this is purely a frontend issue. 


By the end of this project the three of us learned a lot about Web3 and blockchain. With more time there is so much we would like to add, improve, and clean up. Our Web3 auction site offers a lot of functionality, highlighted by the ability to have a multi-bid and relist objects, amounting value equal to each users stake. We are extremely proud of Chesster and are looking forward to iterating on it and developing other Web3 projects in the future.
