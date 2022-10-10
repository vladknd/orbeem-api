import { expect } from "chai";
import { chargeNFTs } from "./nft.services"

describe("NFT SERVICE", () => {
    it('Should turn "charged" property of every NFT to true.', (done) => {
        chargeNFTs().then(nfts => {
            // console.log(nfts);
            expect(()=> {
                nfts.forEach(element => {
                    if(element.charged === false) return false
                })
                return true
            })
            done()
        })
    })
})