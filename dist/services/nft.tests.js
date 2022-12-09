"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const nft_services_1 = require("./nft.services");
describe("NFT SERVICE", () => {
    it('Should turn "charged" property of every NFT to true.', (done) => {
        (0, nft_services_1.chargeNFTs)().then(nfts => {
            // console.log(nfts);
            (0, chai_1.expect)(() => {
                nfts.forEach(element => {
                    if (element.charged === false)
                        return false;
                });
                return true;
            });
            done();
        });
    });
});
