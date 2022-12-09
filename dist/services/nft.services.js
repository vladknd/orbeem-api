"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chargeNFTs = exports.dischargeNFT = exports.getNFTCharge = exports.getNFT = void 0;
const db_1 = require("../db");
const getNFT = (_nftID) => __awaiter(void 0, void 0, void 0, function* () {
    const nft = yield db_1.prismaClient.nft.findUnique({
        where: {
            nftID: _nftID
        }
    });
    if (nft)
        return nft;
    const newNFT = yield db_1.prismaClient.nft.create({
        data: {
            nftID: _nftID,
            charged: true
        }
    });
    console.log("nft has been recorded:", nft);
    return newNFT;
});
exports.getNFT = getNFT;
const getNFTCharge = (_nftID) => __awaiter(void 0, void 0, void 0, function* () {
    const nft = yield db_1.prismaClient.nft.findUnique({ where: {
            nftID: _nftID
        } });
    console.log("FIND NFT CHARGE", nft);
    if (nft)
        return nft.charged;
    const newNFT = yield db_1.prismaClient.nft.create({
        data: {
            nftID: _nftID,
            charged: true
        }
    });
    console.log("nft has been recorded:", nft);
    return newNFT.charged;
});
exports.getNFTCharge = getNFTCharge;
const dischargeNFT = (_nftID) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedNFT = yield db_1.prismaClient.nft.update({
        where: {
            nftID: _nftID
        },
        data: {
            charged: false
        }
    });
});
exports.dischargeNFT = dischargeNFT;
const chargeNFTs = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.prismaClient.nft.updateMany({
        where: {},
        data: {
            charged: true
        }
    });
    const nfts = db_1.prismaClient.nft.findMany();
    // console.log("NFT-SERVICE: NFTs HAVE BEEN CHARGED", nfts, typeof nfts);
    return nfts;
});
exports.chargeNFTs = chargeNFTs;
